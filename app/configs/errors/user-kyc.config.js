import { bugsLevel } from '../../variables/common.variable';

const UserKycErrorConfig = {
  EMPTY_PERSON_ID: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'UKYC0',
    message: 'Person ID cannot be empty!'
  },
  EMPTY_USER_KYC_ID: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'UKYC1',
    message: 'User KYC ID cannot be empty!'
  },
  EMPTY_ACTION_MATCH_USER: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'UKYC2',
    message: 'Action cannot be empty!'
  },
  USER_KYC_NOT_FOUND: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: 'UKYC3',
    message: 'User KYC not found'
  },
  USER_KYC_STATUS_ALREADY_DONE: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: 'UKYC4',
    message: 'User KYC status is DONE. Cannot proceed further'
  },
  USER_KYC_STATUS_NOT_EXPIRED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: 'UKYC5',
    message: 'User KYC status is not EXPIRED. Cannot proceed further'
  },
  EMPTY_MEMBER_ID: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'UKYC6',
    message: 'Member ID cannot be empty!'
  },
  EMPTY_DOC_USER_KYC: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: 'UKYC7',
    message: 'User KYC Document NRIC or Passport or FIN cannot be empty!'
  },
  EMPTY_DOC_LETTER_OF_EMPLOYMENT: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: 'UKYC8',
    message: 'Document letter of employment cannot be empty!'
  },
  EMPTY_DOC_NRIC_OR_PASSPORT_OR_FIN: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: 'UKYC9',
    message: 'Document (NRIC/Passport/FIN) cannot be empty!'
  },
  EMPTY_DOC_POA: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: 'UKYC9',
    message: 'Document proof of address cannot be empty!'
  },
  EMPTY_EMPLOYEE_ID: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'UKYC10',
    message: 'Employee ID cannot be empty!'
  },
  EMPTY_EMPLOYEE_DIAL_CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'UKYC11',
    message: 'Employee Dial Code cannot be empty!'
  },
  EMPTY_EMPLOYEE_PHONE_NUMBER: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'UKYC12',
    message: 'Employee Phone NUmber cannot be empty!'
  },
  EMPTY_EMPLOYEE_EMAIL_ADDRESS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'UKYC13',
    message: 'Employee email address cannot be empty!'
  },
  EMPTY_DATE_OF_BIRTH: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'UKYC14',
    message: 'Date of birth cannot be empty!'
  },
  EMPTY_NATIONALITY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'UKYC15',
    message: 'Nationality cannot be empty!'
  },
  EMPTY_LEGAL_FIRST_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'UKYC16',
    message: 'Legal first name cannot be empty!'
  },
  EMPTY_LEGAL_LAST_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'UKYC17',
    message: 'Legal last name cannot be empty!'
  },
  EMPTY_COMPANY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'UKYC18',
    message: 'Company data cannot be empty!'
  }
};

export default UserKycErrorConfig;
