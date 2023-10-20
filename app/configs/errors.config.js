import { bugsLevel } from '../variables/common.variable';
import { BillStatus } from '../variables/enum.variable';

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
  INVITATION_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '02',
    message: 'Invitation not found'
  },
  INVALID_ID: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '06',
    message: 'Invalid id in URL parameter. Must be a single String of 12 bytes or a string of 24 hex characters'
  },
  CONTACTS_SUBMITTED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '03',
    message: 'Can\'t continue, contact has been submitted'
  },
  CONTACTS_INVALIDATED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '04',
    message: 'Can\'t continue, contact has been invalidated'
  },
  CONTACTS_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '05',
    message: 'Can\'t continue, contact not found'
  },
  CONTACTS_PAYLOAD_VALIDATION: (message) => ({
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '08',
    message: `Can't continue, ${message}`
  }),
  BILL_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '09',
    message: 'Can\'t continue, bill not found'
  },
  BILL_SUBMITTED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '10',
    message: 'Can\'t continue, contact has been submitted'
  },
  INVOICE_TEMPLATE_SUBMITTED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '03',
    message: 'Can\'t continue, invoice template has been submitted'
  },
  INVOICE_TEMPLATE_INVALIDATED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '04',
    message: 'Can\'t continue, invoice template has been invalidated'
  },
  FAILED_ACRA_FETCH_TOKEN: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '07',
    message: 'Fetch token from ACRA failed'
  },
  FAILED_ACRA_REFRESH_TOKEN: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '08',
    message: 'Refresh ACRA token failed'
  },
  INVOICE_TEMPLATE_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '05',
    message: 'Can\'t continue, invoice template not found'
  },
  INVOICE_TEMPLATE_PAYLOAD_VALIDATION: (message) => ({
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '10',
    message: `Can't continue, ${message}`
  }),
  BUSINESS_DETAILS_SUBMITTED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '03',
    message: 'Can\'t continue, invoice business details has been submitted'
  },
  BUSINESS_DETAILS_INVALIDATED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '04',
    message: 'Can\'t continue, invoice business details has been invalidated'
  },
  BUSINESS_DETAILS_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '05',
    message: 'Can\'t continue, invoice business details not found'
  },
  BUSINESS_DETAILS_PAYLOAD_VALIDATION: (message) => ({
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '10',
    message: `Can't continue, ${message}`
  }),
  PAYEE_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '11',
    message: 'Can\'t continue, payee not found'
  },
  PAYMENT_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '12',
    message: 'Can\'t continue, payment not found'
  },
  PAYMENT_ACCOUNT_EXIST: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '13',
    message: 'Can\'t continue, payment account already exist'
  },
  PAYMENT_ACCOUNT_NOT_FOUND: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '14',
    message: 'Can\'t continue, payment account not found'
  },
  VALIDATION_ERROR: (message) => ({
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '15',
    message
  }),
  DUPLICATE_S3ID: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '16',
    message: 'Can\'t continue, duplicate s3id'
  },
  ENTITY_TYPE_NOT_SUPPORTED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '17',
    message: 'Can\'t continue, entity type not supported'
  },
  EMPTY_ID: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '18',
    message: 'ID can\'t be empty'
  },
  MULTIPLE_ERRORS: {
    httpStatus: 400,
    level: bugsLevel.MINOR
  },
  EMPTY_PAYLOAD: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '19',
    message: 'Payload can\'t be empty'
  },
  PAYLOAD_ARRAY_MINIMUM: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '20',
    message: 'This Payload is not allowed to be empty'
  },
  PAYLOAD_ARRAY_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '21',
    message: 'This Payload is only allowed to be filled with Array'
  },
  OBJECT_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '22',
    message: 'This Payload is only allowed to be filled with Object'
  },
  CREATE_USER_EMAIL_EXIST: {
    httpStatus: 500,
    level: bugsLevel.MINOR,
    code: '23',
    message: 'Cannot use this email. Email has taken.'
  },
  CREATE_ORGANIZATION_EXIST: {
    httpStatus: 500,
    level: bugsLevel.MINOR,
    code: '24',
    message: 'Cannot use this uen or organization name'
  },
  CREATE_PHONE_NUMBER_EXIST: {
    httpStatus: 500,
    level: bugsLevel.MINOR,
    code: '25',
    message: 'Cannot use this phone number. Phone number has taken.'
  },
  ARRAY_FILL_OBJECT_BASE: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '26',
    message: 'This Array is only allowed to be filled with Object'
  },
  PAYLOAD_OBJECT_MINIMUM: {
    httpStatus: 422,
    level: bugsLevel.MINOR,
    code: '27',
    message: 'This Payload is not allowed to be empty'
  },
  CONTACTS_HAVE_PENDING_TRANSACTION: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '28',
    message: 'Can\'t continue, contact have pending transaction'
  },
  CONTACTS_HAVE_NOT_BANK_ACCOUNT_DETAIL: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '29',
    message: 'Can\'t continue, contact don\'t have bank account detail'
  },
  INVALID_ORGANIZATION_ID: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '30',
    message: 'Invalid organizationId. Must be a single String of 12 bytes or a string of 24 hex characters'
  },
  BILL_FILE_ALREADY_EXISTS: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '31',
    message: 'Can\'t continue, bill file already exists'
  },
  BILL_STATUS_CANT_EDITED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '32',
    message: 'Bill status can only be edited when ACTION REQUIRED'
  },
  BILL_CANT_APPROVED_BY_USER: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '33',
    message: 'Bill can\'t be approved by this user'
  },
  BILL_FAILED_APPROVED_MISSING_REQUIRED_FIELD: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '34',
    message: 'Bill can\'t be approved, missing required field'
  },
  BILL_FAILED_APPROVED_INVALID_CURRENCY: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '35',
    message: 'Bill can\'t be approved, invalid currency'
  },
  BILL_FAILED_DELETE_PAID_STATUS: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '36',
    message: 'Bill can\'t be deleted, because of bill status is PAID or PARTIAL PAID'
  },
  BILL_FAILED_DELETE_UNAUTHORIZED_ROLE: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '37',
    message: 'Bill can\'t be deleted, because of you are not authorized to delete this bill'
  },
  WAIVE_FEE_TRANSACTION_NOT_FOUND: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '38',
    message: 'Waive fee transaction not found'
  },
  BILL_STATUS_CANT_PROCESSED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '39',
    message: `Bill status can only be processed when ${BillStatus.APPROVED}, ${BillStatus.OVERDUE}, ${BillStatus.PARTIALLY_PAID}, or ${BillStatus.PAID}`
  },
  BILL_AMOUNT_RECEIVE_GREATER_THAN_UNPAID_AMOUNT: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '40',
    message: 'Bill amount receive can\'t be greater than unpaid amount'
  },
  BILL_PAYMENT_ACCOUNT_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '41',
    message: 'Can\'t continue, payment account not found'
  },
  UNAUTHORIZED_ACCESS: {
    httpStatus: 403,
    level: bugsLevel.MINOR,
    code: '42',
    message: 'You do not have permission to perform this action'
  },
  USER_KYC_EMAIL_ALREADY_INVITED: {
    httpStatus: 500,
    level: bugsLevel.MINOR,
    code: '43',
    message: 'Email already invited to this organization'
  },
  USER_KYC_EMAIL_ALREADY_EXISTS: {
    httpStatus: 500,
    level: bugsLevel.MINOR,
    code: '44',
    message: 'Email already existed in this organization'
  },
  PAYSLIP_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '45',
    message: 'Can\'t continue, payslip not found'
  },
  OTP_UNAUTHORIZED: {
    httpStatus: 401,
    level: bugsLevel.MINOR,
    code: '46',
    message: 'OTP is invalid or expired'
  }
};
