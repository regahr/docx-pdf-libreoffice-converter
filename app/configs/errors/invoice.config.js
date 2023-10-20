import { bugsLevel } from '../../variables/common.variable';

export default {
  SUBMITTED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '03',
    message: 'Can\'t continue, invoice has been submitted'
  },
  INVALIDATED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '04',
    message: 'Can\'t continue, invoice has been invalidated'
  },
  NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '05',
    message: 'Can\'t continue, invoice not found'
  },
  PAYLOAD_VALIDATION: (message) => ({
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '08',
    message: `Can't continue, ${message}`
  })
};
