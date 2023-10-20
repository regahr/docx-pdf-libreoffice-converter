import { S3UploadGeneral, S3GetFile } from '../../utils/s3General.util';
import { DocumentFunc } from './document.function';
import documentErrors from '../../configs/errors/document.config';
import {
  AcceptedExtensionAdditionalDocumentKYB,
  DefaultOrganizationIdForKYBDoc
} from '../../variables/enum.variable';

/**
 * Upload file.
 * @param {File} file
 * @param {string} organizationId
 * @param {string} fileType
 * @returns uploaded file
 */
export const UploadFunc = {

  async downloadFile(documentId) {
    const document = await DocumentFunc.getById(documentId);

    if (!document) throw new Error(documentErrors.DOCUMENT_NOT_FOUND.message);
    try {
      const file = await S3GetFile(document.s3FileID, true);
      return {
        ...file,
        fileName: document.fileName
      };
    }
    catch (_e) {
      throw new Error(documentErrors.S3_FILE_NOT_FOUND.message);
    }
  },

  /**
   * Upload additional file for kyb process with dummy organizationId
   * @param {File} file
   * @param {string} fileType
   * @returns
   */
  async uploadAdditionalFile(file, fileType) {
    const organizationId = DefaultOrganizationIdForKYBDoc;

    if (!AcceptedExtensionAdditionalDocumentKYB.includes(file.originalname.toLowerCase().split('.').pop())) {
      throw new Error(documentErrors.FILE_EXTENSION_NOT_SUPPORTED.message);
    }

    const s3url = await S3UploadGeneral(file);
    const payload = {
      fileName: file.originalname,
      s3FileID: s3url.split('/').at(-1),
      fileType,
      organizationId
    };

    const newDocument = await DocumentFunc.create(payload);
    return {
      documentId: newDocument._id,
      s3FileID: newDocument.s3FileID,
      s3url,
      fileType,
      organizationId
    };
  }

};

export default { UploadFunc };
