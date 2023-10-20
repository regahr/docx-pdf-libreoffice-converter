import Joi from 'joi';
import { isEmpty } from 'lodash';
import { isValidObjectId } from 'mongoose';
import multer from 'multer';
import globalErrors from '../../configs/errors.config';
import { postError } from '../../services/service.slack';
import { errorsGenerator } from '../../utils/error.util';
import { errorResponse } from '../../variables/common.variable';
import errorsConfig from '../../configs/generals/errors.config';

export const DocumentMid = {

  async upload(req, res, next) {
    const name = 'Upload File';

    const schema = Joi.object().keys({
      files: Joi.object().required().messages({
        'any.required': errorsConfig.GENERAL_EMPTY_FILES.message
      })
    });

    const storage = multer.memoryStorage();
    const upload = multer({ storage });
    upload.single('files')(req, res, async () => {
      const { error } = schema.validate({
        files: req.file
      });
      try {
        if (!isEmpty(error)) {
          throw new Error(error.message);
        }
        next();
      }
      catch (err) {
        const metaResponse = errorsGenerator(err, [
          errorsConfig.GENERAL_EMPTY_FILES
        ]);

        res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
          metaResponse.code,
          metaResponse.message));
        if (process.env.NODE_ENV !== 'test') {
          postError(req, name, metaResponse.level, metaResponse.message);
        }
      }
    });
  },

  async download(req, res, next) {
    try {
      const { documentId } = req.params;
      const validity = isValidObjectId(documentId);
      if (!validity) throw new Error(globalErrors.INVALID_ID.message);

      next();
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        globalErrors.INVALID_ID
      ]);

      res.status(metaResponse.httpStatus).json(errorResponse(
        'ERROR',
        metaResponse.code,
        metaResponse.message
      ));
    }
  }
};

export default DocumentMid;
