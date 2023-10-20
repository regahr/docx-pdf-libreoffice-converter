import Joi from 'joi';
import { isEmpty } from 'lodash';
import { isValidObjectId } from 'mongoose';
import errorsConfig from '../../configs/business-account/errors.config';
import { postError } from '../../services/service.slack';
import { errorsGenerator } from '../../utils/error.util';
import { errorResponse } from '../../variables/common.variable';
import { SystemVarFunc } from '../../functions/general/system-variable.function';

export const TransferMid = {

  async lockExchangeRate(req, res, next) {
    const name = 'Exchange rate lock and hold';
    try {
      const organizationId = req.credentials.organization._id.toString();
      const validity = isValidObjectId(organizationId);
      if (!validity) throw new Error(errorsConfig.INVALID_ORGANIZATION_ID.message);
      const currencyISO3Letter = await SystemVarFunc.getEnumCurrency();
      const schema = Joi.object().keys({
        destinationCurrency: Joi.string().required().valid(...currencyISO3Letter).messages({
          'any.required': errorsConfig.BA_EMPTY_DESTINATION_CURRENCY.message,
          'string.empty': errorsConfig.BA_EMPTY_DESTINATION_CURRENCY.message,
          'any.only': errorsConfig.BA_INVALID_VALUE_DESTINATION_CURRENCY.message
        }),
        niumWalletId: Joi.string().required().messages({
          'any.required': errorsConfig.BA_EMPTY_NIUM_WALLET_ID.message,
          'string.empty': errorsConfig.BA_EMPTY_NIUM_WALLET_ID.message
        }),
        currency: Joi.string().valid(...currencyISO3Letter).messages({
          'any.required': errorsConfig.BA_EMPTY_CURRENCY.message,
          'string.empty': errorsConfig.BA_EMPTY_CURRENCY.message,
          'any.only': errorsConfig.BA_INVALID_VALUE_CURRENCY.message
        })
      });
      const { error } = schema.validate(req.query);
      if (!isEmpty(error)) throw new Error(error.message);
      next();
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.BA_EMPTY_DESTINATION_CURRENCY,
        errorsConfig.BA_INVALID_VALUE_DESTINATION_CURRENCY,
        errorsConfig.BA_EMPTY_NIUM_WALLET_ID
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

export default { TransferMid };
