import { bugsLevel } from '../../variables/common.variable';

const MemberErrorConfig = {

  MEMBER_NOT_FOUND: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: 'MEMBER1',
    message: 'User KYC not found'
  },
  EMPTY_DOC_LETTER_OF_EMPLOYMENT: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: 'MEMBER2',
    message: 'Document letter of employment cannot be empty!'
  },
  EMPTY_DOC_NRIC_OR_PASSPORT_OR_FIN: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: 'MEMBER3',
    message: 'Document (NRIC/Passport/FIN) cannot be empty!'
  },
  EMPTY_DOC_POA: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: 'MEMBER4',
    message: 'Document proof of address cannot be empty!'
  },
  EMPTY_EMPLOYEE_ID: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'MEMBER5',
    message: 'Employee ID cannot be empty!'
  },
  EMPTY_EMPLOYEE_DIAL_CODE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'MEMBER6',
    message: 'Employee Dial Code cannot be empty!'
  },
  EMPTY_EMPLOYEE_PHONE_NUMBER: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'MEMBER7',
    message: 'Employee Phone NUmber cannot be empty!'
  },
  EMPTY_EMPLOYEE_EMAIL_ADDRESS: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'MEMBER8',
    message: 'Employee email address cannot be empty!'
  },
  EMPTY_DATE_OF_BIRTH: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'MEMBER9',
    message: 'Date of birth cannot be empty!'
  },
  EMPTY_NATIONALITY: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'MEMBER10',
    message: 'Nationality cannot be empty!'
  },
  EMPTY_LEGAL_FIRST_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'MEMBER11',
    message: 'Legal first name cannot be empty!'
  },
  EMPTY_LEGAL_LAST_NAME: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: 'MEMBER12',
    message: 'Legal last name cannot be empty!'
  }
};

export default MemberErrorConfig;
