import { bugsLevel } from '../../variables/common.variable';

export default {
  NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '44',
    message: 'Can\'t continue, COA template not found'
  },
  ALREADY_EXIST: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '13',
    message: 'Can\'t continue, COA template with given version already exist'
  },
  INVALID_ID: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '06',
    message: 'Invalid id, Must be a single String of 12 bytes or a string of 24 hex characters'
  },
  DUPLICATE_CODE: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '16',
    message: 'Can\'t continue, One template should have different COA Code, already exist'
  },
  NO_LIVE_TEMPLATE: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '17',
    message: 'Can\'t continue, There\'s no live template have been set'
  },
  LIVE_TEMPLATE_DELETE: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '18',
    message: 'Can\'t continue, Live template can\'t be deleted'
  },
  PAYLOAD_VALIDATION: (message) => ({
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '08',
    message: `Can't continue, ${message}`
  })
};
