import { bugsLevel } from '../../variables/common.variable';

export default {
  SUBMITTED: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '03',
    message: 'Can\'t continue, notification has been submitted'
  },
  NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '05',
    message: 'Can\'t continue, notification not found'
  }
};
