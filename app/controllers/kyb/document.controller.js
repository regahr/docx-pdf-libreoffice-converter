import { UploadFunc } from '../../functions/general/upload.function';
import { errorsGenerator } from '../../utils/error.util';
import { errorResponse, okResponse } from '../../variables/common.variable';
import documentErrors from '../../configs/errors/document.config';
import { AdditionalDocFileTypeForKYB } from '../../variables/enum.variable';

export const DocumentController = {

  async upload(req, res, next) {
    const name = 'Upload KYB Document';
    try {
      const { file } = req;

      const result = await UploadFunc.uploadAdditionalFile(file, AdditionalDocFileTypeForKYB);

      res.send(okResponse('OK', '00', result, 'Upload document successful'));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        documentErrors.FILE_EXTENSION_NOT_SUPPORTED
      ]);

      next({ req: { ...req }, name, metaResponse });
    }
  },

  async downloadFile(req, res) {
    const { documentId } = req.params;
    try {
      const result = await UploadFunc.downloadFile(documentId);

      res.set('Content-disposition', `attachment; filename=${result.fileName}`);
      res.set('Content-Type', result.contentType);
      res.set('Content-Length', result.contentLength);
      res.status(200).send(result.fileData);
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        documentErrors.DOCUMENT_NOT_FOUND,
        documentErrors.S3_FILE_NOT_FOUND
      ]);

      res.status(metaResponse.httpStatus).json(errorResponse('ERROR',
        metaResponse.code,
        metaResponse.message));
    }
  }
};

export default function noop() {}
