import CryptoJS from 'crypto-js';
import * as bcrypt from 'bcryptjs';
import { result } from 'lodash';
import errorsConfig from '../../configs/auth/errors.config';
import envConfig from '../../configs/env.config';
import { UsersFunc } from './users.function';
import { OrganizationFunc } from './organization.function';
import { UserTrailFunc } from './user-trail.function';
import { CoaOrganizationFunc } from '../coa/coa-organization.function';
import ApplicationFunc from '../business-account/application.function';

import { DocumentFunc } from '../general/document.function';
import {
  DefaultOrganizationIdForKYBDoc,
  AdditionalDocFileTypeForKYB
} from '../../variables/enum.variable';

import UserUtil from '../../utils/user.util';

export const AuthFunc = {
  /**
   * Request verification code.
   * @param {string} to
   * @param {string} channel
   * @returns request status
   */
  async requestCode(to, channel) {
    return { status: 'sent', to, channel };
  },

  /**
   * Verify verification code.
   * @param {string} to
   * @param {string} code
   * @returns verify status
   */
  async verifyCode(to, code) {
    return { status: 'verified', to, code };
  },

  /**
   * Sign in.
   * @param {string} body
   * @returns user
   */
  async signin(agent, body, sessionId, uniqueId = '') {
    let user = null;
    if (body && body.emailAddress) {
      user = await UsersFunc.findOneByEmail(body.emailAddress.toLowerCase());
    }
    else if (body && body.phoneNumber) {
      if (body.dialCode) {
        user = await UsersFunc.findOneByDialCodeAndPhoneNumber(body.dialCode, body.phoneNumber);
      }
      else {
        const returnedUsers = await UsersFunc.findByPhoneNumber(body.phoneNumber);
        if (returnedUsers && returnedUsers.length > 0) {
          if (returnedUsers.length > 1) {
            throw new Error(errorsConfig.AUTH_MULTIPLE_USERS_ASSOCIATED_PHONE_NUMBER.message);
          }
          else {
            user = returnedUsers[0];
          }
        }
      }
    }
    if (!user) throw new Error(JSON.stringify(errorsConfig.AUTH_USER_NOT_EXISTS(body.emailAddress ? 'email' : 'phone')));
    const organization = await OrganizationFunc.findOrganizationByUser(user._id);
    if (user && !user.isActive && organization && organization.length > 0) {
      throw new Error(errorsConfig.AUTH_USER_NOT_ACTIVE.message);
    }
    let isWebApp = true;
    if (agent.toLowerCase().includes('mobile') && body.deviceId !== 'WEB') isWebApp = false;
    if (user && user.isBlocked) throw new Error(JSON.stringify(errorsConfig.AUTH_USER_BLOCKED(!isWebApp ? 'mobile' : 'web')));
    const bytes = CryptoJS.AES.decrypt(body.encryptedPin, envConfig.auth.encryption.secret);
    const pin = bytes.toString(CryptoJS.enc.Utf8);
    const isValidated = bcrypt.compareSync(pin, user.pin);
    if (!isValidated) {
      if (body.emailAddress) {
        user = await UsersFunc.updateOneByEmail(body.emailAddress,
          { wrongPinAttempt: user.wrongPinAttempt + 1 });
        if (user.wrongPinAttempt > 2) {
          await UsersFunc.updateOneByEmail(body.emailAddress,
            { isBlocked: true });
        }
        throw new Error(JSON.stringify(errorsConfig.AUTH_WRONG_PIN(!isWebApp ? 'mobile' : 'web', user.wrongPinAttempt)));
      }
      else if (body.phoneNumber) {
        user = await UsersFunc.updateOneByPhoneNumber(body.phoneNumber,
          { wrongPinAttempt: user.wrongPinAttempt + 1 });
        if (user.wrongPinAttempt > 2) {
          if (!isWebApp && user.wrongPinAttempt > 3) {
            await UsersFunc.updateOneByPhoneNumber(body.phoneNumber,
              { isBlocked: true });
          }
          else {
            await UsersFunc.updateOneByPhoneNumber(body.phoneNumber,
              { isBlocked: true });
          }
        }
        throw new Error(JSON.stringify(errorsConfig.AUTH_WRONG_PIN(!isWebApp ? 'mobile' : 'web', user.wrongPinAttempt)));
      }
    }
    else if (user.wrongPinAttempt > 0) {
      if (body.emailAddress) {
        await UsersFunc.updateOneByEmail(body.emailAddress,
          { wrongPinAttempt: 0 });
      }
      else if (body.phoneNumber) {
        await UsersFunc.updateOneByPhoneNumber(body.phoneNumber,
          { wrongPinAttempt: 0 });
      }
    }
    const { deviceId } = body;
    let recognizedUser;
    if (result(user, 'deviceId', []).includes(!isWebApp ? deviceId : uniqueId)) {
      recognizedUser = user;
    }

    UserTrailFunc.create(
      body.emailAddress,
      user.dialCode + user.phoneNumber,
      sessionId,
      true
    );
    return { user, recognizedUser };
  },

  /**
   * Sign out.
   */
  async signout(emailAddress, phoneNumber, sessionId) {
    UserTrailFunc.create(
      emailAddress,
      phoneNumber,
      sessionId,
      false
    );
  },

  /**
   * Onboard company.
   * @param {string} credentials
   * @param {any} body
   * @returns company
   */
  async onboardCompany(credentials, body) {
    const user = await UsersFunc.findOneByEmail(credentials.email);
    const { additionalDocumentIds } = body;
    if (!user) throw new Error(`Critical! possible hacking attempt! attempted email: ${credentials.email}`);
    const users = [{ userId: user._id, role: 'APPROVER', status: 'ACTIVE' }];
    const payload = {
      freemiumDetails: {
        registrationCountry: body.countryOfLegalRegistration,
        primaryCurrency: body.primaryCurrency,
        uen: body.legalDetails.uen
      },
      status: {
        organizationStatus: 'ACTIVE',
        accessLevelStatus: 'FREEMIUM'
      },
      organizationPlan: 'STARTER',
      companyName: body.companyName,
      users
    };
    const organization = await OrganizationFunc.create(payload);
    if (!organization) throw new Error('Critical! Failed to interact with database(Organization)');

    const generatedEmail = UserUtil.generateEmail(user, organization);

    OrganizationFunc.update(organization._id, {
      users: [
        {
          ...users[0],
          generatedEmail
        }
      ]
    });

    const coa = await CoaOrganizationFunc.create(organization._id);
    if (!coa) throw new Error('Critical! Failed to interact with database(COA)');
    const updatedUser = await UsersFunc.updateOneByEmail(credentials.email, { isActive: true });
    if (!updatedUser) throw new Error('Critical! Failed to interact with database');

    if (additionalDocumentIds) {
      // get all file that previously uploaded
      const documents = await DocumentFunc.getAllByOrganizationIdFileTypeAndIds(
        additionalDocumentIds,
        DefaultOrganizationIdForKYBDoc,
        AdditionalDocFileTypeForKYB
      );

      if (documents.length) {
        const ids = documents.map((doc) => doc._id);

        DocumentFunc.updateOrganizationIdByIds(ids, organization._id);

        // SendgridApiService.sendKYBAdditionalDocs({
        //   companyName: body.companyName,
        //   documents,
        //   baseUrl
        // });
      }
    }

    return organization;
  },

  /**
   * Get Onboard company Detail.
   * @param {Object} credentials
   * @returns company
   */
  async getOnboardCompanyDetail(credentials) {
    return ApplicationFunc.getOnboardCompanyDetail(credentials.organization._id);
  },

  /**
   * Check PIN.
   * @param {string} body
   * @returns user
   */
  async checkPin(body, credentials) {
    let user = null;
    if (credentials && credentials.email) {
      user = await UsersFunc.findOneByEmail(credentials.email);
    }
    else if (credentials && credentials.phone) {
      user = await UsersFunc.findOneByPhoneNumber(credentials.phone);
    }
    // eslint-disable-next-line no-nested-ternary
    if (!user) throw new Error(`Critical! possible hacking attempt! attempted ${credentials && credentials.email ? 'email address' : credentials && credentials.phone ? 'phone number' : 'unknown'}: ${(credentials && credentials.email) || (credentials && credentials.phone) || 'unknown'}`);
    const bytes = CryptoJS.AES.decrypt(body.encryptedPin, envConfig.auth.encryption.secret);
    const pin = bytes.toString(CryptoJS.enc.Utf8);
    const isValidated = bcrypt.compareSync(pin, user.pin);
    if (!isValidated) throw new Error(errorsConfig.AUTH_INCORRECT_AT_CHECK_PIN.message);
    return user;
  },

  /**
   * For adding document to existing organization and email it
   * @param {*} credentials
   * @param {*} body
   * @param {string} baseUrl
   * @returns
   */
  async addOnboardCompanyDocument(credentials, body) {
    const { additionalDocumentIds } = body;

    if (additionalDocumentIds) {
      // get all file that previously uploaded
      const documents = await DocumentFunc.getAllByOrganizationIdFileTypeAndIds(
        additionalDocumentIds,
        DefaultOrganizationIdForKYBDoc,
        AdditionalDocFileTypeForKYB
      );

      if (documents.length) {
        const ids = documents.map((doc) => doc._id);

        DocumentFunc.updateOrganizationIdByIds(ids, credentials.organization._id);

        // SendgridApiService.sendKYBAdditionalDocs({
        //   companyName: credentials.organization.companyName,
        //   documents,
        //   baseUrl
        // });
      }
      return documents.length;
    }
    return 0;
  }
};

export function noop() { }
