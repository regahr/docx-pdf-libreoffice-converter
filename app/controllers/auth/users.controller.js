import jwt from 'jsonwebtoken';
import errorsConfig from '../../configs/auth/errors.config';
import envConfig from '../../configs/env.config';
import { OrganizationFunc } from '../../functions/auth/organization.function';
import { UsersFunc } from '../../functions/auth/users.function';
import Application from '../../models/kyb/Application.model';
import { errorsGenerator } from '../../utils/error.util';
import { okResponse } from '../../variables/common.variable';
import Roles from '../../models/auth/Roles.model';

export const UsersController = {
  async updateUserByToken(req, res, next) {
    const name = 'Update User by Token';
    try {
      const user = req.body;
      let token = req.cookies.access_token;
      const agent = req.headers['user-agent'];
      if (agent && agent.toLowerCase().includes('mobile') && !token) {
        const { authorization } = req.headers;
        if (!authorization) throw new Error(errorsConfig.AUTH_TOKEN_NOT_PRESENT.message);
        token = authorization;
      }
      if (!token || token === 'invalid-token') throw new Error(errorsConfig.AUTH_TOKEN_NOT_PRESENT.message);
      const credentials = jwt.verify(token, envConfig.app.jwtSecret);
      if (!credentials) throw new Error(errorsConfig.AUTH_TOKEN_INVALID.message);
      if (!credentials.email) throw new Error(errorsConfig.AUTH_MISSING_EMAIL.message);
      if (!credentials.phone) throw new Error(errorsConfig.AUTH_MISSING_PHONE.message);
      const updatedUser = await UsersFunc.updateOneByEmail(credentials.email, user);
      if (!updatedUser) throw new Error('Critical! Failed to interact with database');
      res.status(200).json(okResponse('OK', '00', updatedUser, name));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_TOKEN_NOT_PRESENT,
        errorsConfig.AUTH_TOKEN_INVALID,
        errorsConfig.AUTH_MISSING_EMAIL,
        errorsConfig.AUTH_MISSING_PHONE
      ]);
      next({ req: { ...req }, name, metaResponse });
    }
  },
  async getUserByToken(req, res, next) {
    const name = 'Get User by Token';
    try {
      let token = req.cookies.access_token;
      const agent = req.headers['user-agent'];
      if (agent && agent.toLowerCase().includes('mobile') && !token) {
        const { authorization } = req.headers;
        if (!authorization) throw new Error(errorsConfig.AUTH_TOKEN_NOT_PRESENT.message);
        token = authorization;
      }
      if (!token || token === 'invalid-token') throw new Error(errorsConfig.AUTH_TOKEN_NOT_PRESENT.message);
      const credentials = jwt.verify(token, envConfig.app.jwtSecret);
      if (!credentials) throw new Error(errorsConfig.AUTH_TOKEN_INVALID.message);
      if (!credentials.email) throw new Error(errorsConfig.AUTH_MISSING_EMAIL.message);
      if (!credentials.phone) throw new Error(errorsConfig.AUTH_MISSING_PHONE.message);
      const user = await UsersFunc.findOneByEmail(credentials.email);

      if (!user) throw new Error(errorsConfig.AUTH_USER_NOT_EXISTS.message);
      const organizations = await OrganizationFunc
        .findOrganizationByUserWithAggregate(user._id.toString());
      const application = await Application.find({ submittedBy: user._id });

      let generatedEmail = '';
      let permissions = {};
      if (credentials.organizationId) {
        const selectedOrganization = organizations
          .find((org) => `${org._id}` === credentials.organizationId.toString());

        if (selectedOrganization) {
          generatedEmail = selectedOrganization.generatedEmail || '';
          const { role } = selectedOrganization;

          const rolePermission = await Roles.findOne({ roleName: role });

          if (rolePermission) {
            permissions = rolePermission.permissions.reduce((acc, permission) => {
              acc[permission.code] = permission;
              return acc;
            }, {});
          }
        }
      }

      const response = {
        id: user._id,
        phoneNumber: user.phoneNumber,
        emailAddresses: user.emailAddresses,
        isPhoneNumberVerified: user.isPhoneNumberVerified,
        isEmailAddressVerified: user.isEmailAddressVerified,
        isActive: user.isActive,
        isBlocked: user.isBlocked,
        wrongPinAttempt: user.wrongPinAttempt,
        organization: organizations,
        callFirstName: user.callFirstName,
        callLastName: user.callLastName,
        dialCode: user.dialCode,
        selectedOrganizationId: credentials.organizationId,
        deviceId: user.deviceId,
        metaData: user.metaData,
        submittedUEN: application.map((u) => u.organizationId),
        generatedEmail,
        isRequestAccountDeletion: user.isRequestAccountDeletion,
        permissions,
        OTPExpiryTime: req.OTPExpiryTime
      };
      res.status(200).json(okResponse('OK', '00', response, name));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_TOKEN_NOT_PRESENT,
        errorsConfig.AUTH_TOKEN_INVALID,
        errorsConfig.AUTH_USER_NOT_EXISTS,
        errorsConfig.AUTH_MISSING_EMAIL,
        errorsConfig.AUTH_MISSING_PHONE
      ]);
      next({ req: { ...req }, name, metaResponse });
    }
  },

  async verifyUserEmail(req, res, next) {
    const name = 'Verify user email';
    try {
      const { token } = req.params;
      const credentials = jwt.verify(
        token,
        envConfig.auth.encryption.secret
      );
      const { email } = credentials;
      const user = await UsersFunc.findOneByEmail(email);
      const payload = { isEmailAddressVerified: true };
      // if email already verified, return error
      if (user.isEmailAddressVerified === false) {
        const updatedUser = await UsersFunc.update(user.id, payload);
        if (!updatedUser) throw new Error('Critical error! Failed to interact with database');
        // segment tracking
        // UserTrack.trackEmailValidated(updatedUser);
        res.status(200).json(okResponse('OK', '00', email, name));
      }
      else if (user.isEmailAddressVerified === true) {
        res.status(409).json(okResponse('Forbidden', '00', email, 'Email already verified'));
      }
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, []);
      next({ req: { ...req }, name, metaResponse });
    }
  },

  async requestAccountDeactivation(req, res, next) {
    const {
      user: {
        emailAddresses: [email]
      }
    } = req.credentials;

    const name = 'Request account deactivation';

    try {
      const user = await UsersFunc.findOneByEmail(email);
      const payload = { isRequestAccountDeletion: true };
      // await SendgridApiService.requestAccountDeactivation({
      //   email,
      //   userId,
      //   name: (`${callFirstName} ${callLastName}`).trim(),
      //   phoneNumber: `${dialCode}${phoneNumber}`
      // });
      const updatedUser = await UsersFunc.update(user.id, payload);
      if (!updatedUser) throw new Error('Critical error! Failed to interact with database');
      res.status(200).json(okResponse('OK', '00', null, name));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, []);
      next({ req: { ...req }, name, metaResponse });
    }
  },

  async cancelAccountDeactivation(req, res, next) {
    const {
      user: {
        emailAddresses: [email]
      }
    } = req.credentials;

    const name = 'Cancel account deactivation';
    try {
      const user = await UsersFunc.findOneByEmail(email);
      const payload = { isRequestAccountDeletion: false };
      // await SendgridApiService.cancelAccountDeactivation({
      //   email,
      //   userId,
      //   name: (`${callFirstName} ${callLastName}`).trim(),
      //   phoneNumber: `${dialCode}${phoneNumber}`
      // });
      const updatedUser = await UsersFunc.update(user.id, payload);
      if (!updatedUser) throw new Error('Critical error! Failed to interact with database');
      res.status(200).json(okResponse('OK', '00', null, name));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, []);
      next({ req: { ...req }, name, metaResponse });
    }
  }

};

export function noop() { }
