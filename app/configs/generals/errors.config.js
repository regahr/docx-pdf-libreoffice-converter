import { bugsLevel } from '../../variables/common.variable';

export default {
  UNCATEGORIZED: {
    httpStatus: 500,
    level: bugsLevel.MAJOR,
    code: '98'
  },
  CRITICAL: {
    httpStatus: 500,
    level: bugsLevel.CRITICAL,
    code: '99'
  },
  GENERAL_EMPTY_DIAL_CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '100',
    message: 'Dial code cannot be empty!',
    solution: 'Please insert the dial code field'
  },
  GENERAL_INVALID_FORMAT_DIAL_CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '101',
    message: 'Dial code must be in correct format!',
    solution: 'Please insert the dial code with correct format, ex: +65'
  },
  GENERAL_EMPTY_COUNTRY_ISO_3_CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '102',
    message: 'Country ISO 3 code cannot be empty!',
    solution: 'Please insert the country ISO 3 code field'
  },
  GENERAL_INVALID_FORMAT_COUNTRY_ISO_3_CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '103',
    message: 'Country ISO 3 code must be in correct format!',
    solution: 'Please insert the country ISO 3 code with correct format, ex: SGP'
  },
  GENERAL_EMPTY_CURRENCY_CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '104',
    message: 'Currency code cannot be empty!',
    solution: 'Please insert the currency code field'
  },
  GENERAL_INVALID_FORMAT_CURRENCY_CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '105',
    message: 'Currency code must be in correct format!',
    solution: 'Please insert the currency code with correct format, ex: SGD'
  },
  GENERAL_EMPTY_CURRENCY_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '106',
    message: 'Currency name cannot be empty!',
    solution: 'Please insert the currency name field'
  },
  GENERAL_EMPTY_COUNTRY_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '107',
    message: 'Country name cannot be empty!',
    solution: 'Please insert the country name field'
  },
  GENERAL_DUPLICATE_COUNTRY: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '108',
    message: 'Country already exist!',
    solution: 'Delete the existing one or just cancel this process'
  },
  GENERAL_MISSING_CODE: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '109',
    message: 'Code must present!',
    solution: ''
  },
  GENERAL_COUNTRY_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '110',
    message: 'Country not found!',
    solution: 'Add the country in countries page'
  },
  GENERAL_DUPLICATE_LEGAL_TYPE: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '111',
    message: 'Legal type already exist!',
    solution: 'Delete the existing one or just cancel this process'
  },
  GENERAL_LEGAL_TYPE_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '112',
    message: 'Legal type not found!',
    solution: 'Add the legal type in legal type page'
  },
  GENERAL_EMPTY_CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '113',
    message: 'Code cannot be empty!',
    solution: 'Please insert the code'
  },
  GENERAL_EMPTY_DESCRIPTION: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '114',
    message: 'Description cannot be empty!',
    solution: 'Please insert the description'
  },
  GENERAL_INVALID_FORMAT_CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '115',
    message: 'Code must be in correct format!',
    solution: 'The correct format example is AAA'
  },
  GENERAL_DUPLICATE_BUSINESS_TYPE: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '116',
    message: 'Business type already exist!',
    solution: 'Delete the existing one or just cancel this process'
  },
  GENERAL_BUSINESS_TYPE_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '117',
    message: 'Business type not found!',
    solution: 'Add the business type in business type page'
  },
  GENERAL_EMPTY_CURRENCY_SYMBOL: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '118',
    message: 'Currency symbol cannot be empty!',
    solution: 'Please insert the currency symbol'
  },
  GENERAL_EMPTY_COUNTRY_ISO_2_CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '119',
    message: 'Country ISO 2 code cannot be empty!',
    solution: 'Please insert the country ISO code field'
  },
  GENERAL_INVALID_FORMAT_COUNTRY_ISO_2_CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '120',
    message: 'Country ISO 2 code must be in correct format!',
    solution: 'Please insert the country ISO code with correct format, ex: SG'
  },
  GENERAL_EMPTY_COUNTRY_FLAG_URL: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '121',
    message: 'Country flag url cannot be empty!',
    solution: 'Please insert the country flag url'
  },
  GENERAL_EMPTY_COUNTRY_FLAG_CIRCLE_URL: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '121A',
    message: 'Country flag circle url cannot be empty!',
    solution: 'Please insert the country flag circle url'
  },
  GENERAL_EMPTY_FILES: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '122',
    message: 'File cannot be empty!',
    solution: 'Please input the file'
  },
  GENERAL_EMPTY_ORGANIZATION_ID: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '123',
    message: 'Organization ID cannot be empty!',
    solution: 'Please input the Organization ID'
  },
  GENERAL_VALIDATION_ERROR: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '124',
    message: 'Organization ID cannot be empty!',
    solution: 'Please input the Organization ID'
  },
  GENERAL_EMPTY_DOCUMENT_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '125',
    message: 'File Type cannot be empty!',
    solution: 'Please input the File Type'
  },
  GENERAL_INVALID_DOCUMENT_TYPE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '126',
    message: 'File Type must be in correct value! ex: NRIC, FIN, Passport, Others'
  },
  GENERAL_EMPTY_ACRA_CURRENCY_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '127',
    message: 'ACRA Currency name cannot be empty!',
    solution: 'Please insert the ACRA Currency name!'
  },
  GENERAL_VARIABLE_NOT_FOUND: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '128',
    message: 'Variable can\'t be found'
  },
  GENERAL_EMPTY_DOCUMENT_NUMBER: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '129',
    message: 'Document number cannot be empty!'
  },
  GENERAL_EMPTY_DOCUMENT_EXPIRY_DATE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '130',
    message: 'Document expiry date cannot be empty!'
  },
  GENERAL_EMPTY_DOCUMENT_ISSUANCE_COUNTRY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '131',
    message: 'Document issuance country cannot be empty!'
  }
};
