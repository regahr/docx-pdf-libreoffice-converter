import { bugsLevel } from '../../variables/common.variable';

const CompanyErrorConfig = {
  COMPANY_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: 'C01',
    message: 'Can\'t continue, company not found'
  },
  MEMBER_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: 'M01',
    message: 'Can\'t continue, member not found'
  },
  PERSON_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: 'P01',
    message: 'Can\'t continue, person not found'
  },
  SHARE_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: 'S01',
    message: 'Can\'t continue, share not found'
  }
};

export default CompanyErrorConfig;
