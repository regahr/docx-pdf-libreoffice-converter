import Joi from 'joi';
import _, { isEmpty } from 'lodash';
import errorsConfig from '../../configs/auth/errors.config';
import { postError } from '../../services/service.slack';
import { errorsGenerator } from '../../utils/error.util';
import { errorResponse } from '../../variables/common.variable';
import ApplicationErrors from '../../configs/errors/application.config';
import { CacheUtil } from '../../utils/cache.util';
import { SystemVarFunc } from '../../functions/general/system-variable.function';
import { OTP_TYPE, VariableNameVsCategoryMap } from '../../variables/enum.variable';

export const AuthMid = {
  async signup(req, res, next) {
    const name = 'Signup to BEAN';
    try {
      const dialCodeRegex = /^(\+\d{1,4})$/;
      const numberOnlyRegex = /^[0-9]*$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const pinRegex = /^\$2[ayb]\$.{56}$/;
      const schema = Joi.object().keys({
        firstName: Joi.string().required().messages({
          'any.required': errorsConfig.AUTH_EMPTY_FIRST_NAME.message,
          'string.empty': errorsConfig.AUTH_EMPTY_FIRST_NAME.message
        }),
        lastName: Joi.string().required().messages({
          'any.required': errorsConfig.AUTH_EMPTY_LAST_NAME.message,
          'string.empty': errorsConfig.AUTH_EMPTY_LAST_NAME.message
        }),
        dialCode: Joi.string().regex(dialCodeRegex).required().messages({
          'any.required': errorsConfig.AUTH_EMPTY_DIAL_CODE.message,
          'string.empty': errorsConfig.AUTH_EMPTY_DIAL_CODE.message,
          'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_DIAL_CODE.message
        }),
        phoneNumber: Joi.string().regex(numberOnlyRegex).max(30).required()
          .messages({
            'any.required': errorsConfig.AUTH_EMPTY_PHONE_NUMBER.message,
            'string.empty': errorsConfig.AUTH_EMPTY_PHONE_NUMBER.message,
            'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_PHONE_NUMBER.message
          }),
        emailAddress: Joi.string().regex(emailRegex).required().messages({
          'any.required': errorsConfig.AUTH_EMPTY_EMAIL_ADDRESS.message,
          'string.empty': errorsConfig.AUTH_EMPTY_EMAIL_ADDRESS.message,
          'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_EMAIL_ADDRESS.message
        }),
        pin: Joi.string().regex(pinRegex).required().messages({
          'any.required': errorsConfig.AUTH_EMPTY_PIN.message,
          'string.empty': errorsConfig.AUTH_EMPTY_PIN.message,
          'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_PIN.message
        })
      });
      const { error } = schema.validate({ ...req.body });
      if (!isEmpty(error)) throw new Error(error.message);
      next();
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_EMPTY_FIRST_NAME,
        errorsConfig.AUTH_EMPTY_LAST_NAME,
        errorsConfig.AUTH_EMPTY_DIAL_CODE,
        errorsConfig.AUTH_INVALID_FORMAT_DIAL_CODE,
        errorsConfig.AUTH_EMPTY_PHONE_NUMBER,
        errorsConfig.AUTH_INVALID_FORMAT_PHONE_NUMBER,
        errorsConfig.AUTH_EMPTY_EMAIL_ADDRESS,
        errorsConfig.AUTH_INVALID_FORMAT_EMAIL_ADDRESS,
        errorsConfig.AUTH_EMPTY_PIN,
        errorsConfig.AUTH_INVALID_FORMAT_PIN
      ]);
      res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
        metaResponse.code,
        metaResponse.message));
      if (process.env.NODE_ENV !== 'test') {
        postError(req, name, metaResponse.level, metaResponse.message);
      }
    }
  },
  async requestCode(req, res, next) {
    const name = 'Request Code';
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const dialCodeRegex = /^(\+\d{1,4})$/;
      const numberOnlyRegex = /^[0-9]*$/;
      const schema = Joi.object().keys({
        channel: Joi.string().required().valid('sms', 'email').messages({
          'any.required': errorsConfig.AUTH_CHANNEL_NOT_PRESENT.message,
          'string.empty': errorsConfig.AUTH_CHANNEL_NOT_PRESENT.message,
          'any.only': errorsConfig.AUTH_INVALID_VALUE_CHANNEL.message
        }),
        dialCode: Joi.string().regex(dialCodeRegex).messages({
          'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_DIAL_CODE.message
        }),
        phoneNumber: Joi.string().regex(numberOnlyRegex)
          .messages({
            'string.empty': errorsConfig.AUTH_EMPTY_PHONE_NUMBER.message,
            'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_PHONE_NUMBER.message
          }),
        emailAddress: Joi.string().regex(emailRegex).messages({
          'string.empty': errorsConfig.AUTH_EMPTY_EMAIL_ADDRESS.message,
          'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_EMAIL_ADDRESS.message
        })
      });
      const { error } = schema.validate({ ...req.body });
      if (!isEmpty(error)) throw new Error(error.message);
      next();
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_CHANNEL_NOT_PRESENT,
        errorsConfig.AUTH_INVALID_VALUE_CHANNEL,
        errorsConfig.AUTH_INVALID_FORMAT_DIAL_CODE,
        errorsConfig.AUTH_INVALID_FORMAT_PHONE_NUMBER,
        errorsConfig.AUTH_EMPTY_PHONE_NUMBER,
        errorsConfig.AUTH_EMPTY_EMAIL_ADDRESS,
        errorsConfig.AUTH_INVALID_FORMAT_EMAIL_ADDRESS
      ]);

      res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
        metaResponse.code,
        metaResponse.message));
      if (process.env.NODE_ENV !== 'test') {
        postError(req, name, metaResponse.level, metaResponse.message);
      }
    }
  },
  async verifyCode(req, res, next) {
    const name = 'Verify Code';
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const dialCodeRegex = /^(\+\d{1,4})$/;
      const numberOnlyRegex = /^[0-9]*$/;
      const schema = Joi.object().keys({
        channel: Joi.string().required().valid('sms', 'email').messages({
          'any.required': errorsConfig.AUTH_CHANNEL_NOT_PRESENT.message,
          'string.empty': errorsConfig.AUTH_CHANNEL_NOT_PRESENT.message,
          'any.only': errorsConfig.AUTH_INVALID_VALUE_CHANNEL.message
        }),
        code: Joi.string().required().regex(numberOnlyRegex).max(6)
          .messages({
            'any.required': errorsConfig.AUTH_CODE_NOT_PRESENT.message,
            'string.empty': errorsConfig.AUTH_CODE_NOT_PRESENT.message,
            'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_CODE.message
          }),
        dialCode: Joi.string().regex(dialCodeRegex).messages({
          'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_DIAL_CODE.message
        }),
        phoneNumber: Joi.string().regex(numberOnlyRegex)
          .messages({
            'string.empty': errorsConfig.AUTH_EMPTY_PHONE_NUMBER.message,
            'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_PHONE_NUMBER.message
          }),
        emailAddress: Joi.string().regex(emailRegex).messages({
          'string.empty': errorsConfig.AUTH_EMPTY_EMAIL_ADDRESS.message,
          'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_EMAIL_ADDRESS.message
        }),
        type: Joi.string().valid(OTP_TYPE.SHOW_CARD_ENCRYPTED_DATA)

      });
      const { error } = schema.validate({ ...req.body });
      if (!isEmpty(error)) throw new Error(error.message);
      next();
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_CHANNEL_NOT_PRESENT,
        errorsConfig.AUTH_INVALID_VALUE_CHANNEL,
        errorsConfig.AUTH_CODE_NOT_PRESENT,
        errorsConfig.AUTH_EMPTY_PHONE_NUMBER,
        errorsConfig.AUTH_EMPTY_EMAIL_ADDRESS,
        errorsConfig.AUTH_INVALID_FORMAT_CODE
      ]);
      res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
        metaResponse.code,
        metaResponse.message));
      if (process.env.NODE_ENV !== 'test') {
        postError(req, name, metaResponse.level, metaResponse.message);
      }
    }
  },
  async onboardCompany(req, res, next) {
    const name = 'Onboard company to BEAN';
    try {
      const isoCodeRegex = /^(\b[A-Z]{3})$/;
      const countryISO2Letter = await SystemVarFunc.getEnumCountryIso2Code();
      const IndustrySector = await CacheUtil.getNiumConstant(
        'IndustrySector',
        (item) => (item.code)
      );

      const AnnualTurnOver = await CacheUtil.getNiumConstant(
        'AnnualTurnOver',
        (item) => (item.code)
      );

      const TotalEmployees = await CacheUtil.getNiumConstant(
        'TotalEmployees',
        (item) => (item.code)
      );
      const Countries = await CacheUtil.getDataCache(
        'Countries',
        async () => SystemVarFunc
          .getEnumByCategory(VariableNameVsCategoryMap.Countries),
        '',
        null
      );
      const isSameBusinessAddress = _.get(req.body, 'address.isSameBusinessAddress', false);
      const locationOfBusiness = _.get(req.body, 'locationOfBusiness', null);

      const addressSchema = {};

      if (!isSameBusinessAddress) {
        addressSchema.locationOfBusiness = Joi.string().required()
          .valid(...countryISO2Letter).messages({
            'string.empty': ApplicationErrors.EMPTY_LOCATION_OF_BUSINESS.message,
            'any.only': ApplicationErrors.AUTH_INVALID_FORMAT_COUNTRY_ISO2CODE.message
          });
        if (locationOfBusiness === 'SG') {
          addressSchema.address = Joi.object().required().keys({
            isSameBusinessAddress: Joi.boolean(),
            unit: Joi.string()
              // required().
              .messages({
                'string.empty': ApplicationErrors.EMPTY_ADDRESS_UNIT.message,
                'any.required': ApplicationErrors.EMPTY_ADDRESS_UNIT.message
              }),
            level: Joi.string()
              // required().
              .messages({
                'string.empty': ApplicationErrors.EMPTY_ADDRESS_LEVEL.message,
                'any.required': ApplicationErrors.EMPTY_ADDRESS_LEVEL.message
              }),
            blockHouse: Joi.string().required().messages({
              'string.empty': ApplicationErrors.EMPTY_ADDRESS_BLOCK_HOUSE.message,
              'any.required': ApplicationErrors.EMPTY_ADDRESS_BLOCK_HOUSE.message
            }),
            buildingName: Joi.string()
              // required().
              .messages({
                'string.empty': ApplicationErrors.EMPTY_ADDRESS_BUILDING_NAME.message,
                'any.required': ApplicationErrors.EMPTY_ADDRESS_BUILDING_NAME.message
              }),
            streetName: Joi.string().required().messages({
              'string.empty': ApplicationErrors.EMPTY_ADDRESS_STREET_NAME.message,
              'any.required': ApplicationErrors.EMPTY_ADDRESS_STREET_NAME.message
            }),
            postalCode: Joi.string().required().messages({
              'string.empty': ApplicationErrors.EMPTY_POSTCODE.message,
              'any.required': ApplicationErrors.EMPTY_POSTCODE.message
            })
          });
        }
        else {
          addressSchema.address = Joi.object().required().keys({
            isSameBusinessAddress: Joi.boolean(),
            addressLine1: Joi.string().required().messages({
              'string.empty': ApplicationErrors.EMPTY_ADDRESSLINE1.message,
              'any.required': ApplicationErrors.EMPTY_ADDRESSLINE1.message
            }),
            addressLine2: Joi.string().allow(''),
            postalCode: Joi.string().required().messages({
              'any.required': ApplicationErrors.EMPTY_POSTCODE.message,
              'string.empty': ApplicationErrors.EMPTY_POSTCODE.message
            }),
            city: Joi.string().required().messages({
              'any.required': ApplicationErrors.EMPTY_CITY.message,
              'string.empty': ApplicationErrors.EMPTY_CITY.message
            }),
            state: Joi.string().required().messages({
              'any.required': ApplicationErrors.EMPTY_STATE.message,
              'string.empty': ApplicationErrors.EMPTY_STATE.message
            })
          });
        }
      }
      else {
        addressSchema.address = Joi.object().required().keys({
          isSameBusinessAddress: Joi.boolean()
        });
      }

      const schema = Joi.object().keys({
        companyName: Joi.string().required().messages({
          'any.required': errorsConfig.AUTH_EMPTY_COMPANY_NAME.message,
          'string.empty': errorsConfig.AUTH_EMPTY_COMPANY_NAME.message
        }),
        countryOfLegalRegistration: Joi.string().valid(...countryISO2Letter).required()
          .messages({
            'any.required': errorsConfig.AUTH_EMPTY_COUNTRY_OF_LEGAL_TRANSACTION.message,
            'string.empty': errorsConfig.AUTH_EMPTY_COUNTRY_OF_LEGAL_TRANSACTION.message,
            'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_COUNTRY_OF_LEGAL_TRANSACTION.message
          }),
        primaryCurrency: Joi.string().regex(isoCodeRegex).required()
          .messages({
            'any.required': errorsConfig.AUTH_EMPTY_PRIMARY_CURRENCY.message,
            'string.empty': errorsConfig.AUTH_EMPTY_PRIMARY_CURRENCY.message,
            'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_PRIMARY_CURRENCY.message
          }),
        legalDetails: Joi.object().required().keys({
          uen: Joi.string().required().messages({
            'any.required': errorsConfig.AUTH_EMPTY_UEN.message,
            'string.empty': errorsConfig.AUTH_EMPTY_UEN.message
          })
        }),
        riskProfileAssessment: Joi.object().required().keys({
          countryOfOperations: Joi.array().required()
            .items(Joi.string().valid(...Countries)).messages({
              'any.required': ApplicationErrors.EMPTY_COUNTRY_OF_OPERATION.message
            }),
          annualTurnover: Joi.string().required().valid(...AnnualTurnOver).messages({
            'any.required': ApplicationErrors.EMPTY_ANNUAL_TURN_OVER.message,
            'string.empty': ApplicationErrors.EMPTY_ANNUAL_TURN_OVER.message
          }),
          totalEmployees: Joi.string().required().valid(...TotalEmployees).messages({
            'any.required': ApplicationErrors.EMPTY_TOTAL_EMPLOYEES.message,
            'string.empty': ApplicationErrors.EMPTY_TOTAL_EMPLOYEES.message
          })
        }),
        businessDetails: Joi.object().required().keys({
          businessWebsite: Joi.string().allow(''),
          doingBusinessAs: Joi.string().allow(''),
          primaryIndustry: Joi.string().required().valid(...IndustrySector).messages({
            'any.only': ApplicationErrors.AUTH_INVALID_FORMAT_PRIMARY_INDUSTRY.message,
            'any.required': ApplicationErrors.EMPTY_PRIMARY_INDUSTRY.message,
            'string.empty': ApplicationErrors.EMPTY_PRIMARY_INDUSTRY.message
          })
        }),
        ...addressSchema,
        additionalDocumentIds: Joi.array().items(Joi.string())
      });
      const { error } = schema.validate({ ...req.body });
      if (!isEmpty(error)) throw new Error(error.message);
      next();
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_EMPTY_COMPANY_NAME,
        errorsConfig.AUTH_EMPTY_COUNTRY_OF_LEGAL_TRANSACTION,
        errorsConfig.AUTH_INVALID_FORMAT_COUNTRY_OF_LEGAL_TRANSACTION,
        errorsConfig.AUTH_EMPTY_TYPE_OF_LEGAL_ENTITY,
        errorsConfig.AUTH_EMPTY_TYPE_OF_BUSINESS,
        errorsConfig.AUTH_EMPTY_PRIMARY_CURRENCY,
        errorsConfig.AUTH_INVALID_FORMAT_PRIMARY_CURRENCY,
        errorsConfig.AUTH_EMPTY_UEN,
        ApplicationErrors.EMPTY_COUNTRY_OF_OPERATION,
        ApplicationErrors.EMPTY_ANNUAL_TURN_OVER,
        ApplicationErrors.EMPTY_TOTAL_EMPLOYEES,
        ApplicationErrors.AUTH_INVALID_FORMAT_PRIMARY_INDUSTRY,
        ApplicationErrors.EMPTY_PRIMARY_INDUSTRY,
        ApplicationErrors.EMPTY_LOCATION_OF_BUSINESS,
        ApplicationErrors.AUTH_INVALID_FORMAT_COUNTRY_ISO2CODE,
        ApplicationErrors.EMPTY_ADDRESS_UNIT,
        ApplicationErrors.EMPTY_ADDRESS_LEVEL,
        ApplicationErrors.EMPTY_ADDRESS_BLOCK_HOUSE,
        ApplicationErrors.EMPTY_ADDRESS_BUILDING_NAME,
        ApplicationErrors.EMPTY_ADDRESS_STREET_NAME,
        ApplicationErrors.EMPTY_POSTCODE,
        ApplicationErrors.EMPTY_ADDRESSLINE1,
        ApplicationErrors.EMPTY_CITY,
        ApplicationErrors.EMPTY_STATE

      ]);
      res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
        metaResponse.code,
        metaResponse.message));
      if (process.env.NODE_ENV !== 'test') {
        postError(req, name, metaResponse.level, metaResponse.message);
      }
    }
  },

  async addOnboardCompanyDocument(req, res, next) {
    const name = 'Add Onboard company Document';
    try {
      const schema = Joi.object().keys({
        additionalDocumentIds: Joi.array().items(Joi.string())
      });
      const { error } = schema.validate({ ...req.body });
      if (!isEmpty(error)) throw new Error(error.message);
      next();
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, []);
      res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
        metaResponse.code,
        metaResponse.message));
      if (process.env.NODE_ENV !== 'test') {
        postError(req, name, metaResponse.level, metaResponse.message);
      }
    }
  },
  async signin(req, res, next) {
    const name = 'Signin to BEAN';
    try {
      const dialCodeRegex = /^(\+\d{1,4})$/;
      const phoneNumberRegex = /^(\d*)$/;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const schema = Joi.object().keys({
        phoneNumber: Joi.string().regex(phoneNumberRegex)
          .messages({
            'string.empty': errorsConfig.AUTH_EMPTY_PHONE_NUMBER.message,
            'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_PHONE_NUMBER.message
          }),
        dialCode: Joi.string().regex(dialCodeRegex).messages({
          'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_DIAL_CODE.message
        }),
        // .when('phoneNumber', {
        //   is: Joi.exist(),
        //   then: Joi.string().regex(dialCodeRegex).required()
        //     .messages({
        //       'any.required': errorsConfig.AUTH_EMPTY_DIAL_CODE.message,
        //       'string.empty': errorsConfig.AUTH_EMPTY_DIAL_CODE.message,
        //       'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_DIAL_CODE.message
        //     }),
        //   otherwise: Joi.forbidden()
        // })

        emailAddress: Joi.string().regex(emailRegex).messages({
          'string.empty': errorsConfig.AUTH_EMPTY_EMAIL_ADDRESS.message,
          'string.pattern.base': errorsConfig.AUTH_INVALID_FORMAT_EMAIL_ADDRESS.message
        }),
        encryptedPin: Joi.string().required().messages({
          'any.required': errorsConfig.AUTH_EMPTY_PIN.message,
          'string.empty': errorsConfig.AUTH_EMPTY_PIN.message
        }),
        deviceId: Joi.string().required().messages({
          'any.required': errorsConfig.AUTH_EMPTY_DEVICE_ID.message,
          'string.empty': errorsConfig.AUTH_EMPTY_DEVICE_ID.message,
          'string.pattern.base': errorsConfig.AUTH_EMPTY_DEVICE_ID.message
        }),
        uniqueId: Joi.string().when('deviceId', {
          is: 'WEB',
          then: Joi.required().messages({
            'any.required': errorsConfig.AUTH_EMPTY_UNIQUE_ID.message,
            'string.empty': errorsConfig.AUTH_EMPTY_UNIQUE_ID.message,
            'string.pattern.base': errorsConfig.AUTH_EMPTY_UNIQUE_ID.message
          }),
          otherwise: Joi.optional()
        })
      }).or('phoneNumber', 'emailAddress').messages({
        'object.missing': errorsConfig.AUTH_MISSING_PHONE_EMAIL.message
      });
      const { error } = schema.validate({ ...req.body });
      if (!isEmpty(error)) throw new Error(error.message);
      next();
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_INVALID_FORMAT_EMAIL_ADDRESS,
        errorsConfig.AUTH_EMPTY_PIN,
        errorsConfig.AUTH_EMPTY_PHONE_NUMBER,
        errorsConfig.AUTH_EMPTY_DIAL_CODE,
        errorsConfig.AUTH_INVALID_FORMAT_DIAL_CODE,
        errorsConfig.AUTH_EMPTY_EMAIL_ADDRESS,
        errorsConfig.AUTH_INVALID_FORMAT_PHONE_NUMBER,
        errorsConfig.AUTH_MISSING_PHONE_EMAIL,
        errorsConfig.AUTH_EMPTY_DEVICE_ID
      ]);
      res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
        metaResponse.code,
        metaResponse.message));
      if (process.env.NODE_ENV !== 'test') {
        postError(req, name, metaResponse.level, metaResponse.message);
      }
    }
  },
  async existsCheck(req, res, next) {
    const name = 'Exists check';
    try {
      const schema = Joi.object().keys({
        toBeChecked: Joi.string().required().messages({
          'any.required': errorsConfig.AUTH_EMPTY_TO_BE_CHECKED.message,
          'string.empty': errorsConfig.AUTH_EMPTY_TO_BE_CHECKED.message
        })
      });
      const { error } = schema.validate({ ...req.body });
      if (!isEmpty(error)) throw new Error(error.message);
      next();
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_EMPTY_TO_BE_CHECKED
      ]);
      res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
        metaResponse.code,
        metaResponse.message));
      if (process.env.NODE_ENV !== 'test') {
        postError(req, name, metaResponse.level, metaResponse.message);
      }
    }
  },
  async organizationSelection(req, res, next) {
    const name = 'Organization selection';
    try {
      const schema = Joi.object().keys({
        selectedOrganizationId: Joi.string().required().messages({
          'any.required': errorsConfig.AUTH_EMPTY_SELECTED_ORGANIZATION_ID.message,
          'string.empty': errorsConfig.AUTH_EMPTY_SELECTED_ORGANIZATION_ID.message
        })
      });
      const { error } = schema.validate({ ...req.body });
      if (!isEmpty(error)) throw new Error(error.message);
      next();
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_EMPTY_SELECTED_ORGANIZATION_ID
      ]);
      res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
        metaResponse.code,
        metaResponse.message));
      if (process.env.NODE_ENV !== 'test') {
        postError(req, name, metaResponse.level, metaResponse.message);
      }
    }
  },
  async checkPin(req, res, next) {
    const name = 'Check PIN to BEAN';
    try {
      const schema = Joi.object().keys({
        encryptedPin: Joi.string().required().messages({
          'any.required': errorsConfig.AUTH_EMPTY_PIN.message,
          'string.empty': errorsConfig.AUTH_EMPTY_PIN.message
        })
      });
      const { error } = schema.validate({ ...req.body });
      if (!isEmpty(error)) throw new Error(error.message);
      next();
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_EMPTY_PIN
      ]);
      res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
        metaResponse.code,
        metaResponse.message));
      if (process.env.NODE_ENV !== 'test') {
        postError(req, name, metaResponse.level, metaResponse.message);
      }
    }
  },
  async deviceRegistration(req, res, next) {
    const name = 'Device Registration';
    try {
      const schema = Joi.object().keys({
        deviceId: Joi.string().required().messages({
          'any.required': errorsConfig.AUTH_EMPTY_DEVICE_ID.message,
          'string.empty': errorsConfig.AUTH_EMPTY_DEVICE_ID.message
        }),
        uniqueId: Joi.string().when('deviceId', {
          is: 'WEB',
          then: Joi.required().messages({
            'any.required': errorsConfig.AUTH_EMPTY_UNIQUE_ID.message,
            'string.empty': errorsConfig.AUTH_EMPTY_UNIQUE_ID.message,
            'string.pattern.base': errorsConfig.AUTH_EMPTY_UNIQUE_ID.message
          }),
          otherwise: Joi.optional()
        })
      });
      const { error } = schema.validate({ ...req.body });
      if (!isEmpty(error)) throw new Error(error.message);
      next();
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.AUTH_EMPTY_DEVICE_ID
      ]);
      res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
        metaResponse.code,
        metaResponse.message));
      if (process.env.NODE_ENV !== 'test') {
        postError(req, name, metaResponse.level, metaResponse.message);
      }
    }
  }

};

export function noop() {}
