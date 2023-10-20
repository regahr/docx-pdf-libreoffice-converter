import Joi from 'joi';
import { isEmpty } from 'lodash';
import errorsConfig from '../../configs/errors.config';
import invoiceErrorsConfig from '../../configs/errors/invoice.config';
import { postError } from '../../services/service.slack';
import { errorResponse } from '../../variables/common.variable';

export const InAppNotificationMid = {

  async updateIsRead(req, res, next) {
    const name = 'Update is read';
    const objectIdPattern = /^[0-9a-fA-F]{24}$/;

    try {
      const schema = Joi.object().keys({
        _id: Joi.string().regex(objectIdPattern).required()
      });

      const { error } = schema.validate({ ...req.body });
      if (isEmpty(error)) {
        next();
      }
      else {
        let message = error.details[0].message.replace('"value" ', '');
        message = `Validation error, details: ${message}`;
        throw new Error(message);
      }
    }
    catch (error) {
      const { message } = error;
      let metaResponse = {};

      if (message.includes('Validation error')) {
        metaResponse = invoiceErrorsConfig.PAYLOAD_VALIDATION(message);
      }
      else if (message.includes('Critical')) {
        metaResponse = errorsConfig.CRITICAL;
        metaResponse.message = message;
      }
      else {
        metaResponse = errorsConfig.UNCATEGORIZED;
        metaResponse.message = message;
      }

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
