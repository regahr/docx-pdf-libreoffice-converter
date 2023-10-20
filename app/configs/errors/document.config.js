import { bugsLevel } from '../../variables/common.variable';

const DocumentErrorConfig = {
  DOCUMENT_NOT_FOUND: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '300',
    message: 'Can\'t continue, document not found'
  },
  EMPTY_FILENAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '301',
    message: 'File Name can\'t empty.'
  },
  EMPTY_FILETYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '302',
    message: 'File Type can\'t empty.'
  },
  EMPTY_S3_FILE_ID: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '303',
    message: 'S3  File ID can\'t empty.'
  },
  S3_FILE_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '304',
    message: 'File doesn\'t exist on S3 Storage'
  },
  FILE_EXTENSION_NOT_SUPPORTED: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '305',
    message: 'File Extension doesn\'t supported yet'
  }
};

export default DocumentErrorConfig;
