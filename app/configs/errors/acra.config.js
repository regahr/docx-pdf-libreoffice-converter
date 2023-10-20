import { bugsLevel } from '../../variables/common.variable';

const AcraErrorConfig = {
  UNCATEGORIZED: {
    httpStatus: 500,
    level: bugsLevel.MAJOR,
    code: '98'
  },
  NO_UEN: {
    httpStatus: 500,
    level: bugsLevel.MAJOR,
    code: '01',
    message: 'Please define the uen'
  }
};

export default AcraErrorConfig;
