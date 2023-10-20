import Joi from 'joi';
import { isEmpty } from 'lodash';
import jwt from 'jsonwebtoken';
import errorsConfig from '../../configs/auth/errors.config';
import globalErrors from '../../configs/errors.config';
import { postError } from '../../services/service.slack';
import { errorsGenerator } from '../../utils/error.util';
import { errorResponse } from '../../variables/common.variable';
import envConfig from '../../configs/env.config';

export const UsersMid = {
  async updateUserByToken(req, res, next) {
    const name = 'Update User by Token';
    try {
      const dialCode = /\+\d{1,3}$/;
      const phoneNumberRegex = /^(\d*)$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const pinRegex = /^\$2[ayb]\$.{56}$/;
      const schema = Joi.object().keys({
        dialCode: Joi.string().regex(dialCode).messages({
          'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_DIAL_CODE.message
        }),
        phoneNumber: Joi.string().regex(phoneNumberRegex).max(30)
          .messages({
            'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_PHONE_NUMBER_WITH_DIAL_CODE.message
          }),
        emailAddress: Joi.string().regex(emailRegex).messages({
          'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_EMAIL_ADDRESS.message
        }),
        pin: Joi.string().regex(pinRegex).messages({
          'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_PIN.message
        }),
        isPhoneNumberVerified: Joi.boolean().messages({
          'boolean.base': errorsConfig.AUTH_INVALID_FORMAT_IS_PHONE_NUMBER_VERIFIED.message
        }),
        isEmailAddressVerified: Joi.boolean().messages({
          'boolean.base': errorsConfig.AUTH_INVALID_FORMAT_IS_EMAIL_ADDRESS_VERIFIED.message
        }),
        isActive: Joi.boolean().messages({
          'boolean.base': errorsConfig.AUTH_INVALID_FORMAT_IS_ACTIVE.message
        }),
        deviceId: Joi.array().items(Joi.string()),
        callFirstName: Joi.string().max(50),
        callLastName: Joi.string().max(50),
        metaData: Joi.object().keys({
          isAdminCreated: Joi.boolean(),
          isFirstTimeAccess: Joi.boolean(),
          hasShownVerifiedEmailSnackbar: Joi.boolean()
        })
      });
      const { error } = schema.validate({ ...req.body });
      if (!isEmpty(error)) throw new Error(error.message);
      next();
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_INVALID_FORMAT_DIAL_CODE,
        errorsConfig.AUTH_INVALID_FORMAT_PHONE_NUMBER_WITH_DIAL_CODE,
        errorsConfig.AUTH_INVALID_FORMAT_EMAIL_ADDRESS,
        errorsConfig.AUTH_INVALID_FORMAT_PIN,
        errorsConfig.AUTH_INVALID_FORMAT_IS_PHONE_NUMBER_VERIFIED,
        errorsConfig.AUTH_INVALID_FORMAT_IS_EMAIL_ADDRESS_VERIFIED,
        errorsConfig.AUTH_INVALID_FORMAT_IS_ACTIVE
      ]);
      res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
        metaResponse.code,
        metaResponse.message));
      if (process.env.NODE_ENV !== 'test') {
        postError(req, name, metaResponse.level, metaResponse.message);
      }
    }
  },

  checkOTP(OTPType = null) {
    const name = 'OTP Validation';
    return (req, res, next) => {
      try {
        // OTP Validation
        const OTPExpiryTime = {};
        const relatedId = req.params.id;
        const otpKeyList = [];
        const otpKeyListTokenOld = req.cookies.otpKeyListToken;
        if (otpKeyListTokenOld) {
          const otpKeyListOld = jwt.verify(otpKeyListTokenOld, envConfig.app.jwtSecret);
          otpKeyList.push(...otpKeyListOld.otpKeyList);
        }
        if (OTPType && relatedId) {
          const key = `OTPChecker_${OTPType}`;
          const otpIsValidToken = req.cookies[key];
          const otpIsValidTokenRelated = req.cookies[`${key}_${relatedId}`];

          if (otpIsValidToken) {
            const otpIsValidData = jwt
              .verify(otpIsValidToken, envConfig.app.jwtSecret);

            const expiryTime = new Date(otpIsValidData.expiryTime);
            if (expiryTime > new Date()) {
              OTPExpiryTime[`${OTPType}_${relatedId}`] = expiryTime;
            }
            res.clearCookie(key);
            res.cookie(`${key}_${relatedId}`, otpIsValidToken, { secure: true, httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none' });
            otpKeyList.push(`${key}_${relatedId}`);
          }
          else if (otpIsValidTokenRelated) {
            const otpIsValidData = jwt
              .verify(otpIsValidTokenRelated, envConfig.app.jwtSecret);

            const expiryTime = new Date(otpIsValidData.expiryTime);
            if (expiryTime > new Date()) {
              OTPExpiryTime[`${OTPType}_${relatedId}`] = expiryTime;
            }
          }

          const otpKeyListToken = jwt.sign({ otpKeyList }, envConfig.app.jwtSecret);
          res.cookie('otpKeyListToken', otpKeyListToken, { secure: true, httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none' });

          if (OTPExpiryTime[`${OTPType}_${relatedId}`]) {
            req.OTPExpiryTime = OTPExpiryTime;
            next();
          }
          else {
            throw new Error(globalErrors.OTP_UNAUTHORIZED.message);
          }
        }
        else {
          const otpKeyListNew = [];
          // eslint-disable-next-line no-restricted-syntax
          for (const otpKey of otpKeyList) {
            const params = otpKey.split('_');
            params.splice(0, 1);
            const currentRelatedId = params.pop();
            const otpType = params.join('_');
            if (otpType && currentRelatedId) {
              const key = `OTPChecker_${otpType}`;
              const otpIsValidTokenRelated = req.cookies[`${key}_${currentRelatedId}`];
              if (otpIsValidTokenRelated) {
                const otpIsValidData = jwt
                  .verify(otpIsValidTokenRelated, envConfig.app.jwtSecret);

                const expiryTime = new Date(otpIsValidData.expiryTime);
                if (expiryTime > new Date()) {
                  otpKeyListNew.push(`${key}_${currentRelatedId}`);
                  OTPExpiryTime[`${otpType}_${currentRelatedId}`] = expiryTime;
                }
              }
            }
          }

          const otpKeyListToken = jwt.sign({ otpKeyList: otpKeyListNew }, envConfig.app.jwtSecret);
          res.cookie('otpKeyListToken', otpKeyListToken, { secure: true, httpOnly: true, sameSite: process.env.NODE_ENV === 'production' ? 'lax' : 'none' });
          req.OTPExpiryTime = OTPExpiryTime;
          next();
        }
      }
      catch (error) {
        const metaResponse = errorsGenerator(error, [
          globalErrors.OTP_UNAUTHORIZED
        ]);
        res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
          metaResponse.code,
          metaResponse.message));
        if (process.env.NODE_ENV !== 'test') {
          postError(req, name, metaResponse.level, metaResponse.message);
        }
      }
    };
  }
};

export function noop() { }
