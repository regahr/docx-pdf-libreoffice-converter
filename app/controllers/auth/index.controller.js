import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import errorsConfig from '../../configs/auth/errors.config';
import { okResponse } from '../../variables/common.variable';
import envConfig from '../../configs/env.config';
import { UsersFunc } from '../../functions/auth/users.function';
import { AuthFunc } from '../../functions/auth/index.function';
import { errorsGenerator } from '../../utils/error.util';
import { OrganizationFunc } from '../../functions/auth/organization.function';
import { NiumApiService } from '../../services/service.nium';
import { SaveOrUpdateOtpLog } from '../../models/OtpLog.model';
import { parsePhone } from '../../utils/phone-number.util';
import applicationErrorConfig from '../../configs/errors/application.config';
import { UserKycFunc } from '../../functions/user-kyc/userKyc.function';
import { OTP_TYPE, UserKycStatus } from '../../variables/enum.variable';
import { niumServiceWrapper } from '../../utils/mapstruct.util';

export const AuthController = {
  async signup(req, res, next) {
    const name = 'Signup to BEAN';
    try {
      const { body } = req;
      const response = await UsersFunc.signUp(body);
      if (!response) throw new Error('Critical! Failed to interact with database');
      const token = jwt.sign({
        email: body.emailAddress,
        phone: response.dialCode
          + response.phoneNumber,
        sessionId: uuidv4()
      },
      envConfig.app.jwtSecret);

      // for send verification email
      // const dataBody = {
      //   to: body.emailAddress,
      //   firstName: body.firstName,
      //   linkVerify: linkPrefix + newToken
      // };
      // SendgridApiService.sendMailVerifyYourEmail(dataBody);

      // add segment tracking
      // UserTrack.trackUserCreated(response);

      // adding contact to sendgrid list

      const agent = req.headers['user-agent'];
      if (agent && agent.toLowerCase().includes('mobile')) {
        res.cookie('access_token', token, { secure: true, httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none' }).status(200).json(okResponse('OK', '00', { ...response, token }, 'Signup to BEAN'));
      }
      else {
        res.cookie('access_token', token, { secure: true, httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none' }).status(200).json(okResponse('OK', '00', response, 'Signup to BEAN'));
      }
    }
    catch (error) {
      let metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_DUPLICATE_PHONE_NUMBER,
        errorsConfig.AUTH_DUPLICATE_EMAIL_ADDRESS
      ]);
      if (error && error.code && error.code === 11000) {
        if (Object.keys(error.keyPattern)[0] === 'phoneNumber') {
          metaResponse = {
            ...errorsConfig.AUTH_DUPLICATE_PHONE_NUMBER,
            errorStack: metaResponse.errorStack
          };
        }
        if (Object.keys(error.keyPattern)[0] === 'emailAddresses') {
          metaResponse = {
            ...errorsConfig.AUTH_DUPLICATE_EMAIL_ADDRESS,
            errorStack: metaResponse.errorStack
          };
        }
      }
      next({ req: { ...req }, name, metaResponse });
    }
  },
  async checkToken(req, res, next) {
    const name = 'Check token';
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

      const toBeSigned = {
        email: credentials.email,
        phone: credentials.phone
      };

      const user = await UsersFunc.findOneByEmail(credentials.email);
      if (!user) throw new Error(`Critical! possible hacking attempt! attempted email: ${credentials.email}`);

      if (credentials.organizationId) {
        const organization = await OrganizationFunc.findOne(credentials.organizationId);
        if (!organization) throw new Error(`Critical! possible hacking attempt! attempted organization id: ${credentials.organizationId}`);
        toBeSigned.organizationId = credentials.organizationId;
      }
      toBeSigned.sessionId = credentials.sessionId || uuidv4();

      if (req.query && req.query.regenerate) {
        const accessToken = jwt.sign(toBeSigned,
          envConfig.app.jwtSecret);
        if (agent && agent.toLowerCase().includes('mobile')) {
          res.cookie('access_token', accessToken, { secure: true, httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none' }).status(200).json(okResponse(('OK', '00', { message: 'Token present and valid', token: accessToken })));
        }
        else {
          res.cookie('access_token', accessToken, { secure: true, httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none' }).status(200).json(okResponse('OK', '00', 'Token present and valid'));
        }
      }
      else {
        res.status(200).json(okResponse('OK', '00', 'Token present and valid'));
      }
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
  async requestCode(req, res, next) {
    const name = 'Request Code';
    try {
      const {
        channel, emailAddress, dialCode, phoneNumber
      } = req.body;
      let token = req.cookies.access_token;
      if ((!token || token === 'invalid-token') || (dialCode || phoneNumber || emailAddress)) {
        let to = null;
        if (channel === 'sms') {
          if (!dialCode) throw new Error(errorsConfig.AUTH_EMPTY_DIAL_CODE.message);
          if (!phoneNumber) throw new Error(errorsConfig.AUTH_EMPTY_PHONE_NUMBER.message);
          to = dialCode + phoneNumber;
        }
        else if (channel === 'email') {
          if (!emailAddress) throw new Error(errorsConfig.AUTH_EMPTY_EMAIL_ADDRESS.message);
          to = emailAddress;
        }
        const response = await AuthFunc.requestCode(to, channel);
        if (!response) throw new Error('Critical! Failed to interact with security provider');
        SaveOrUpdateOtpLog(response.sid, 'APPROVE_TRANSFER', response);
        res.status(200).json(okResponse('OK', '00', { status: 'sent' }, name));
      }
      else {
        const agent = req.headers['user-agent'];
        if (agent && agent.toLowerCase().includes('mobile') && !token) {
          const { authorization } = req.headers;
          if (!authorization) throw new Error(errorsConfig.AUTH_TOKEN_NOT_PRESENT.message);
          token = authorization;
        }
        const credentials = jwt.verify(token, envConfig.app.jwtSecret);
        if (!credentials) throw new Error(errorsConfig.AUTH_TOKEN_INVALID.message);
        if (!credentials.email) throw new Error(errorsConfig.AUTH_MISSING_EMAIL.message);
        if (!credentials.phone) throw new Error(errorsConfig.AUTH_MISSING_PHONE.message);
        let to = null;
        if (channel === 'sms') {
          to = credentials.phone;
        } if (channel === 'email') {
          to = credentials.email;
        }
        const response = await AuthFunc.requestCode(to, channel);
        if (!response) throw new Error('Critical! Failed to interact with security provider');
        res.status(200).json(okResponse('OK', '00', { status: 'sent' }, name));
      }
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_EMPTY_DIAL_CODE,
        errorsConfig.AUTH_EMPTY_PHONE_NUMBER,
        errorsConfig.AUTH_EMPTY_EMAIL_ADDRESS,
        errorsConfig.AUTH_TOKEN_INVALID,
        errorsConfig.AUTH_MISSING_EMAIL,
        errorsConfig.AUTH_MISSING_PHONE
      ]);
      next({ req: { ...req }, name, metaResponse });
    }
  },
  async verifyCodeVulnerable(req, res, next) {
    const name = 'Verify Code';
    try {
      const {
        channel, code, emailAddress, dialCode, phoneNumber
      } = req.body;
      let token = req.cookies.access_token;
      let agent = req.headers['user-agent'];
      let to = null;
      // let user = null;
      let credentials = null;
      if (!token || token === 'invalid-token' || (dialCode || phoneNumber || emailAddress)) {
        if (channel === 'sms') {
          if (!dialCode) throw new Error(errorsConfig.AUTH_EMPTY_DIAL_CODE.message);
          if (!phoneNumber) throw new Error(errorsConfig.AUTH_EMPTY_PHONE_NUMBER.message);
          // user = await UsersFunc.findOneByPhoneNumber(phoneNumber);
          to = dialCode + phoneNumber;
        }
        else if (channel === 'email') {
          if (!emailAddress) throw new Error(errorsConfig.AUTH_EMPTY_EMAIL_ADDRESS.message);
          // user = await UsersFunc.findOneByEmail(emailAddress);
          to = emailAddress;
        }
      }
      else {
        if (agent && agent.toLowerCase().includes('mobile') && !token) {
          const { authorization } = req.headers;
          if (!authorization) throw new Error(errorsConfig.AUTH_TOKEN_NOT_PRESENT.message);
          token = authorization;
        }
        credentials = jwt.verify(token, envConfig.app.jwtSecret);
        if (!credentials) throw new Error(errorsConfig.AUTH_TOKEN_INVALID.message);
        if (!credentials.email) throw new Error(errorsConfig.AUTH_MISSING_EMAIL.message);
        if (!credentials.phone) throw new Error(errorsConfig.AUTH_MISSING_PHONE.message);
        if (channel === 'sms') {
          to = credentials.phone;
        } if (channel === 'email') {
          to = credentials.email;
        }
      }
      let response = null;
      // SKIP OTP CHECK AT TESTING AND DEVELOPMENT
      if (process.env.NODE_ENV !== 'production') {
        response = {
          valid: true
        };
      }
      else {
        if (!to) throw new Error('Critical! Failed to interact with database');
        response = await AuthFunc.verifyCode(to, code);
      }
      if (!response) throw new Error('Critical! Failed to interact with security provider');
      if (!response.valid) throw new Error(errorsConfig.AUTH_WRONG_CODE.message);
      if (!token || token === 'invalid-token') {
        let mainEmailAddress = '';
        if (!emailAddress) {
          if (credentials) {
            mainEmailAddress = credentials.email;
          }
        }
        else {
          mainEmailAddress = emailAddress;
        }
        const accessToken = jwt.sign({
          email: mainEmailAddress,
          phone: dialCode
            + phoneNumber,
          sessionId: uuidv4()
        },
        envConfig.app.jwtSecret);
        agent = req.headers['user-agent'];
        if (agent && agent.toLowerCase().includes('mobile')) {
          res.cookie('access_token', accessToken, { secure: true, httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none' }).status(200).json(okResponse('OK', '00', { status: 'verified', token: accessToken }, name));
        }
        else {
          res.cookie('access_token', accessToken, { secure: true, httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none' }).status(200).json(okResponse('OK', '00', { status: 'verified' }, name));
        }
      }
      else {
        res.status(200).json(okResponse('OK', '00', { status: 'verified' }, name));
      }
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_EMPTY_DIAL_CODE,
        errorsConfig.AUTH_EMPTY_PHONE_NUMBER,
        errorsConfig.AUTH_EMPTY_EMAIL_ADDRESS,
        errorsConfig.AUTH_WRONG_CODE,
        errorsConfig.AUTH_TOKEN_INVALID,
        errorsConfig.AUTH_MISSING_EMAIL,
        errorsConfig.AUTH_MISSING_PHONE
      ]);
      next({ req: { ...req }, name, metaResponse });
    }
  },

  async verifyCode(req, res, next) {
    const name = 'Verify Code';
    try {
      const {
        channel, code, emailAddress, dialCode, phoneNumber, type: otpType
      } = req.body;
      let token = req.cookies.access_token;
      let agent = req.headers['user-agent'];
      let to = null;
      let user = null;
      let credentials = null;
      if (!token || token === 'invalid-token' || (dialCode || phoneNumber || emailAddress)) {
        if (channel === 'sms') {
          if (!dialCode) throw new Error(errorsConfig.AUTH_EMPTY_DIAL_CODE.message);
          if (!phoneNumber) throw new Error(errorsConfig.AUTH_EMPTY_PHONE_NUMBER.message);
          user = await UsersFunc.findOneByPhoneNumber(phoneNumber);
          to = dialCode + phoneNumber;
        }
        else if (channel === 'email') {
          if (!emailAddress) throw new Error(errorsConfig.AUTH_EMPTY_EMAIL_ADDRESS.message);
          user = await UsersFunc.findOneByEmail(emailAddress);
          to = emailAddress;
        }
      }
      else {
        if (agent && agent.toLowerCase().includes('mobile') && !token) {
          const { authorization } = req.headers;
          if (!authorization) throw new Error(errorsConfig.AUTH_TOKEN_NOT_PRESENT.message);
          token = authorization;
        }
        credentials = jwt.verify(token, envConfig.app.jwtSecret);
        if (!credentials) throw new Error(errorsConfig.AUTH_TOKEN_INVALID.message);
        if (!credentials.email) throw new Error(errorsConfig.AUTH_MISSING_EMAIL.message);
        if (!credentials.phone) throw new Error(errorsConfig.AUTH_MISSING_PHONE.message);
        if (channel === 'sms') {
          to = credentials.phone;
        } if (channel === 'email') {
          to = credentials.email;
        }
      }
      let response = null;
      // SKIP OTP CHECK AT TESTING AND DEVELOPMENT
      if (process.env.NODE_ENV !== 'production') {
        response = {
          valid: true
        };
      }
      else {
        if (!to || (!user && !credentials)) throw new Error('Critical! Failed to interact with database');
        response = await AuthFunc.verifyCode(to, code);
      }
      const validateAndParseOTPToken = (_req, _res) => {
        let result = {};
        if (otpType === OTP_TYPE.SHOW_CARD_ENCRYPTED_DATA) {
          const otpDataAccessToken = jwt.sign({
            expiryTime: Date.now() + envConfig.auth.OTPTimeToLive.cardShowEncryptedData
          }, envConfig.app.jwtSecret);

          result = {
            cookieName: `OTPChecker_${otpType}`,
            data: otpDataAccessToken
          };
          _res.cookie(`OTPChecker_${otpType}`, otpDataAccessToken, {
            secure: true,
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none',
            maxAge: envConfig.auth.OTPTimeToLive.cardShowEncryptedData
          });
        }

        return result;
      };
      if (!response) throw new Error('Critical! Failed to interact with security provider');
      if (!response.valid) throw new Error(errorsConfig.AUTH_WRONG_CODE.message);
      if (!token || token === 'invalid-token') {
        let mainEmailAddress = '';
        if (!emailAddress) {
          if (!credentials && user) {
            mainEmailAddress = user.emailAddresses[0];
          }
          else if (credentials && !user) {
            mainEmailAddress = credentials.email;
          }
        }
        else {
          mainEmailAddress = emailAddress;
        }
        const accessToken = jwt.sign({
          email: mainEmailAddress,
          phone: user.dialCode
            + user.phoneNumber,
          sessionId: uuidv4()
        },
        envConfig.app.jwtSecret);
        agent = req.headers['user-agent'];

        let otpData = {};
        if (otpType) {
          otpData = validateAndParseOTPToken(req, res);
        }
        if (agent && agent.toLowerCase().includes('mobile')) {
          res.cookie('access_token', accessToken, { secure: true, httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none' }).status(200).json(okResponse('OK', '00', { status: 'verified', token: accessToken, otpData }, name));
        }
        else {
          res.cookie('access_token', accessToken, { secure: true, httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none' }).status(200).json(okResponse('OK', '00', { status: 'verified' }, name));
        }
      }
      else {
        let otpData = {};
        if (otpType) {
          otpData = validateAndParseOTPToken(req, res);
        }
        res.status(200).json(okResponse('OK', '00', { status: 'verified', otpData }, name));
      }
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_EMPTY_DIAL_CODE,
        errorsConfig.AUTH_EMPTY_PHONE_NUMBER,
        errorsConfig.AUTH_EMPTY_EMAIL_ADDRESS,
        errorsConfig.AUTH_WRONG_CODE,
        errorsConfig.AUTH_TOKEN_INVALID,
        errorsConfig.AUTH_MISSING_EMAIL,
        errorsConfig.AUTH_MISSING_PHONE
      ]);
      next({ req: { ...req }, name, metaResponse });
    }
  },
  async onboardCompany(req, res, next) {
    const name = 'Onboard company to BEAN';
    try {
      const { body } = req;
      const baseUrl = envConfig.app.serverBaseUrl;
      body.companyName = body.companyName.toUpperCase();
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
      const company = await AuthFunc.onboardCompany(credentials, body, baseUrl);
      if (!company) throw new Error('Critical failure, can\'t onboard company, database problem');
      const accessToken = jwt.sign({
        email: credentials.email,
        phone: credentials.phone,
        organizationId: company._id,
        sessionId: credentials.sessionId || uuidv4()
      },
      envConfig.app.jwtSecret);
      // RegistrationTrack.trackNewOrganization(credentials.email, company._id.toString());

      // removing contact in sendgrid list

      if (agent && agent.toLowerCase().includes('mobile')) {
        res.cookie('access_token', accessToken, { secure: true, httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none' }).status(200).json(okResponse('OK', '00', { ...company, token: accessToken }, name));
      }
      else {
        res.cookie('access_token', accessToken, { secure: true, httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none' }).status(200).json(okResponse('OK', '00', company, name));
      }
    }
    catch (error) {
      let metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_TOKEN_NOT_PRESENT,
        errorsConfig.AUTH_TOKEN_INVALID,
        errorsConfig.AUTH_MISSING_EMAIL,
        errorsConfig.AUTH_MISSING_PHONE
      ]);
      if (error && error.code && error.code === 11000) {
        if (Object.keys(error.keyPattern)[0] === 'companyName') {
          metaResponse = {
            ...errorsConfig.AUTH_DUPLICATE_COMPANY_NAME,
            errorStack: metaResponse.errorStack
          };
        }
      }

      next({ req: { ...req }, name, metaResponse });
    }
  },
  async getOnboardCompanyDetail(req, res, next) {
    const name = 'Get Onboard company detail';
    try {
      const baseUrl = `${req.protocol}://${req.headers.host}`;

      const result = await AuthFunc.getOnboardCompanyDetail(req.credentials, baseUrl);

      if (!result) throw new Error(applicationErrorConfig.APPLICATION_NOT_FOUND.message);

      const additionalDocumentsMapped = result.additionalDocuments.map((doc) => ({
        url: `${baseUrl}/api/v1/finance/kyb/documents/download/${doc._id}`,
        fileName: doc.fileName
      }));

      result.additionalDocuments = additionalDocumentsMapped;

      res.status(200).json(okResponse('OK', '00', result, name));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        applicationErrorConfig.APPLICATION_NOT_FOUND
      ]);

      next({ req: { ...req }, name, metaResponse });
    }
  },

  async addOnboardCompanyDocument(req, res, next) {
    const name = 'Add Onboard company document';
    try {
      const baseUrl = envConfig.app.serverBaseUrl;

      const documentAdded = await AuthFunc.addOnboardCompanyDocument(
        req.credentials,
        req.body,
        baseUrl
      );

      res.status(200).json(okResponse('OK', '00', documentAdded, name));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, []);

      next({ req: { ...req }, name, metaResponse });
    }
  },

  async signin(req, res, next) {
    const name = 'Signin to BEAN';
    try {
      const { body } = req;
      const sessionId = uuidv4();
      const agent = req.headers['user-agent'];
      const { user, recognizedUser } = await AuthFunc.signin(agent, body, sessionId, body.uniqueId);
      let mainEmailAddress = '';
      if (!body.emailAddress) {
        mainEmailAddress = user.emailAddresses[0];
      }
      else {
        mainEmailAddress = body.emailAddress;
      }
      const token = jwt.sign({
        email: body.emailAddress ? body.emailAddress : mainEmailAddress,
        phone: user.dialCode
          + user.phoneNumber,
        sessionId
      },
      envConfig.app.jwtSecret);

      const [userKyc] = await UserKycFunc.getByQuery({
        emailAddress: mainEmailAddress,
        status: {
          $in: [UserKycStatus.PENDING, UserKycStatus.SENT]
        }
      });
      const credentials = {
        id: user.id,
        emailAddresses: user.emailAddresses,
        mainEmailAddress,
        dialCode: user.dialCode,
        phoneNumber: user.phoneNumber,
        metaData: user.metaData,
        userKycId: userKyc ? userKyc._id : null
      };
      if (agent && agent.toLowerCase().includes('mobile')) {
        res.cookie('access_token', token, { secure: true, httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none' }).status(200).json(okResponse('OK', '00', {
          status: 'Authenticated', isRecognized: !!recognizedUser, token, credentials
        }, name));
      }
      else {
        res.cookie('access_token', token, { secure: true, httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none' }).status(200).json(okResponse('OK', '00', { status: 'Authenticated', isRecognized: !!recognizedUser, credentials }, name));
      }
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_USER_NOT_ACTIVE
      ]);
      next({ req: { ...req }, name, metaResponse });
    }
  },

  async signout(req, res, next) {
    const name = 'Signout from BEAN';
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
      AuthFunc.signout(credentials.email, credentials.phone, credentials.sessionId);
      res.cookie('access_token', 'invalid-token', { secure: true, httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none' }).status(200).json(okResponse('OK', '00', 'Sign out success', name));
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
  async existsCheck(req, res, next) {
    const name = 'Exists check';
    const userAgent = req.headers['user-agent'];
    try {
      let { toBeChecked } = req.body;
      let existsStatus = {
        exists: true,
        as: 'emailAddress'
      };
      let users = await UsersFunc.findByEmailAddress(toBeChecked.toLowerCase());
      if (!users.length) {
        // failed to recognized by email then trying recognizing by phone number
        if (toBeChecked.length < 5) throw new Error(errorsConfig.AUTH_MINIMUM_LENGTH.message);
        const phoneNumberListWithoutDialCode = parsePhone(toBeChecked);
        const phoneNumberListWithDialCode = phoneNumberListWithoutDialCode.map((phone) => `+${phone}`);

        if (toBeChecked.includes('+')) {
          // if phoneNumber using dial code and + symbol
          toBeChecked = toBeChecked.split(' ').join('');
          const user = await UsersFunc.findOneByConcatDialCodeAndPhoneNumber(toBeChecked);
          if (user) users = [user];
        }
        else {
          // try to check phone number with dial code
          // eslint-disable-next-line max-len
          users = await UsersFunc.findAllByConcatDialCodeAndPhoneNumber(phoneNumberListWithDialCode);
          if (!users.length) {
            users = await UsersFunc.findByPhoneNumbers(phoneNumberListWithoutDialCode);
          }
        }

        if (users.length) {
          existsStatus = {
            exists: true,
            as: 'phoneNumber'
          };
          if (users.length === 1) {
            // one credential recognized
            existsStatus.credential = {
              isActive: users[0].isActive,
              isBlocked: users[0].isBlocked,
              dialCode: users[0].dialCode,
              phoneNumber: users[0].phoneNumber
            };
            existsStatus.isHaveMultiCredential = false;
          }
          else {
            existsStatus.credential = {
              phoneNumber: users[0].phoneNumber
            };
            existsStatus.isHaveMultiCredential = true;
          }
        }
        else {
          existsStatus = {
            exists: false
          };
        }
      }
      else {
        // recognized by email address
        existsStatus.credential = {
          isActive: users[0].isActive,
          isBlocked: users[0].isBlocked,
          ...(userAgent === 'mobile' ? {
            dialCode: users[0].dialCode,
            phoneNumber: users[0].phoneNumber
          } : {}),
          mainEmailAddress: users[0].emailAddresses[0]
        };
        existsStatus.isHaveMultiCredential = false;
      }
      res.status(200).json(okResponse('OK', '00', { ...existsStatus }, name));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_MINIMUM_LENGTH
      ]);

      next({ req: { ...req }, name, metaResponse });
    }
  },
  async organizationSelection(req, res, next) {
    const name = 'Organization selection';
    try {
      const { selectedOrganizationId } = req.body;
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
      const user = await UsersFunc.findOneByEmail(credentials.email);
      if (!user) throw new Error(`Critical! possible hacking attempt, email used to attempt: ${credentials.email}`);
      if (user.isBlocked) throw new Error(JSON.stringify(errorsConfig.AUTH_USER_BLOCKED('web')));
      if (!user.isActive) throw new Error(errorsConfig.AUTH_USER_NOT_ACTIVE.message);
      const organization = await OrganizationFunc.findOne(selectedOrganizationId);
      if (!organization) throw new Error(errorsConfig.AUTH_ORGANIZATION_NOT_FOUND.message);
      if (organization.status.organizationStatus === 'INACTIVE') throw new Error(errorsConfig.AUTH_ORGANIZATION_INACTIVE.message);
      if (organization.status.organizationStatus === 'FROZEN') throw new Error(errorsConfig.AUTH_ORGANIZATION_FROZEN.message);

      const organizationUsers = organization.users.filter(
        (au) => au.userId === user._id.toString()
      );
      if (organizationUsers.length === 0) {
        throw new Error(errorsConfig.AUTH_ORGANIZATION_NOT_LINKED.message);
      }
      if (organizationUsers[0].status === 'REVOKED') throw new Error(errorsConfig.AUTH_ORGANIZATION_ACCESS_REVOKED.message);
      if (organizationUsers[0].status === 'FROZEN') throw new Error(errorsConfig.AUTH_ORGANIZATION_ACCESS_FROZEN.message);
      if (organizationUsers[0].status === 'LOCKED') throw new Error(errorsConfig.AUTH_ORGANIZATION_ACCESS_LOCKED.message);

      const accessToken = jwt.sign({
        email: credentials.email,
        phone: credentials.phone,
        organizationId: selectedOrganizationId,
        sessionId: credentials.sessionId || uuidv4()
      },
      envConfig.app.jwtSecret);

      // UserTrack.trackSelectOrganization(user._id.toString(), organization, credentials.email);

      if (agent && agent.toLowerCase().includes('mobile')) {
        res.cookie('access_token', accessToken, { secure: true, httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none' }).status(200).json(okResponse('OK', '00', { ...organization, token: accessToken }, `Successfully select organization with company name ${organization.companyName}`));
      }
      else {
        res.cookie('access_token', accessToken, { secure: true, httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none' }).status(200).json(okResponse('OK', '00', organization, `Successfully select organization with company name ${organization.companyName}`));
      }
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_TOKEN_NOT_PRESENT,
        errorsConfig.AUTH_TOKEN_INVALID,
        errorsConfig.AUTH_USER_BLOCKED('web'),
        errorsConfig.AUTH_USER_NOT_ACTIVE,
        errorsConfig.AUTH_ORGANIZATION_NOT_FOUND,
        errorsConfig.AUTH_ORGANIZATION_NOT_LINKED,
        errorsConfig.AUTH_ORGANIZATION_INACTIVE,
        errorsConfig.AUTH_ORGANIZATION_FROZEN,
        errorsConfig.AUTH_ORGANIZATION_ACCESS_FROZEN,
        errorsConfig.AUTH_ORGANIZATION_ACCESS_REVOKED,
        errorsConfig.AUTH_ORGANIZATION_ACCESS_LOCKED
      ]);
      next({ req: { ...req }, name, metaResponse });
    }
  },
  async getNiumTnc(req, res, next) {
    const name = 'Get Nium TnC';
    try {
      const niumTnc = await niumServiceWrapper(NiumApiService.getTermsAndCondition(), {
        organizationId: null,
        organizationName: null,
        niumWalletId: null,
        niumApi: 'Get Nium TNC - Get TnC'
      });
      const htmlTnc = niumTnc.description;
      res.status(200).json(okResponse('OK', '00', htmlTnc, name));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, []);
      next({ req: { ...req }, name, metaResponse });
    }
  },
  async checkPin(req, res, next) {
    const name = 'Check PIN to BEAN';
    try {
      const { body } = req;
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
      const user = await AuthFunc.checkPin(body, credentials);
      if (!user) throw new Error('Critical failure, connection to database dropped!');
      res.status(200).json(okResponse('OK', '00', 'Pin correct!', name));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_INCORRECT_AT_CHECK_PIN
      ]);
      next({ req: { ...req }, name, metaResponse });
    }
  },
  async deviceRegistration(req, res, next) {
    const name = 'Device registration';
    try {
      const { body } = req;
      let token = req.cookies.access_token;
      const agent = req.headers['user-agent'];
      let isWebApp = true;
      if (agent.toLowerCase().includes('mobile') && body.deviceId !== 'WEB') isWebApp = false;
      if (!isWebApp && !token) {
        const { authorization } = req.headers;
        if (!authorization) throw new Error(errorsConfig.AUTH_TOKEN_NOT_PRESENT.message);
        token = authorization;
      }
      if (!token || token === 'invalid-token') throw new Error(errorsConfig.AUTH_TOKEN_NOT_PRESENT.message);
      const credentials = jwt.verify(token, envConfig.app.jwtSecret);
      if (!credentials) throw new Error(errorsConfig.AUTH_TOKEN_INVALID.message);
      let user = await UsersFunc.findOneByEmail(credentials.email);
      if (!user) throw new Error(`Critical! possible hacking attempt, email used to attempt: ${credentials.email}`);
      const devices = user.deviceId || [];
      const deviceId = !isWebApp ? body.deviceId : body.uniqueId;
      const device = devices.find((d) => d === deviceId);
      if (device) throw new Error(errorsConfig.AUTH_DEVICE_ALREADY_REGISTERED.message);
      devices.push(deviceId);
      user = await UsersFunc.update(user._id, { deviceId: devices });
      res.status(200).json(okResponse('OK', '00', user, name));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_TOKEN_NOT_PRESENT,
        errorsConfig.AUTH_TOKEN_INVALID,
        errorsConfig.AUTH_DEVICE_ALREADY_REGISTERED
      ]);
      next({ req: { ...req }, name, metaResponse });
    }
  }

};

export function noop() { }
