import { bugsLevel } from '../../variables/common.variable';

export default {
  NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '44',
    message: 'Can\'t continue, COA Organization or COA code not found'
  },
  CODE_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '44',
    message: 'Can\'t continue, COA Code not found'
  },
  ALREADY_EXIST: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '13',
    message: 'Can\'t continue, Payment Record already exist'
  },
  INVALID_ID: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '06',
    message: 'Invalid id, Must be a single String of 12 bytes or a string of 24 hex characters'
  },
  COA_ORGANIZATION_ALREADY_EXIST: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '13',
    message: 'Can\'t continue, COA with given organizationId already exist'
  },
  DUPLICATE_CODE: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '16',
    message: 'Can\'t continue, Should have different coa code'
  },
  PAYLOAD_VALIDATION: (message) => ({
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '08',
    message: `Can't continue, ${message}`
  }),
  ORGANIZATION_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '44',
    message: 'Can\'t continue, Organization id not found'
  },
  ORGANIZATION_NO_COA: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '44',
    message: 'Can\'t continue, Organization does not have COA, create it first'
  },
  NO_PAYMENT_RECORD: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '45',
    message: 'Can\'t continue, Organization does not have PaymentRecord COA category. add it first'
  },
  NO_FILTER_PAYMENT_RECORD: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '46',
    message: 'Filter is required for chose Payment Record category'
  }
};
