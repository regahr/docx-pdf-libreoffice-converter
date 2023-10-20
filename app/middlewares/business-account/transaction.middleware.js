import Joi from 'joi';
import { isValidObjectId } from 'mongoose';
import { result } from 'lodash';
import errorsConfig from '../../configs/business-account/errors.config';
import { postError } from '../../services/service.slack';
import { errorsGenerator } from '../../utils/error.util';
import { errorResponse } from '../../variables/common.variable';

export const TransactionMid = {
  async getTransaction(req, res, next) {
    const name = 'Get Transaction';
    try {
      let { organizationId } = req.query;
      if (!organizationId) {
        organizationId = result(req, 'credentials.organization._id', '').toString();
      }
      const validity = isValidObjectId(organizationId);
      if (!validity) throw new Error(errorsConfig.INVALID_ORGANIZATION_ID.message);
      next();
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.INVALID_ORGANIZATION_ID
      ]);
      res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
        metaResponse.code,
        metaResponse.message));
      if (process.env.NODE_ENV !== 'test') {
        postError(req, name, metaResponse.level, metaResponse.message);
      }
    }
  },

  async exportTransaction(req, res, next) {
    const name = 'Export Transaction';
    try {
      let { organizationId } = req.query;
      if (!organizationId) {
        organizationId = result(req, 'credentials.organization._id', '').toString();
      }
      const validity = isValidObjectId(organizationId);
      if (!validity) throw new Error(errorsConfig.INVALID_ORGANIZATION_ID.message);
      const schema = Joi.object().keys({
        currency: Joi.string().messages({
          'any.required': errorsConfig.BA_EMPTY_CURRENCY.message,
          'string.empty': errorsConfig.BA_EMPTY_CURRENCY.message
        }),
        startDate: Joi.date(),
        endDate: Joi.date(),
        organizationId: Joi.string()
      });
      const { error } = schema.validate(req.query);
      if (error) throw new Error(error.message);
      next();
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.INVALID_ORGANIZATION_ID,
        errorsConfig.BA_EMPTY_CURRENCY
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

export default { TransactionMid };
