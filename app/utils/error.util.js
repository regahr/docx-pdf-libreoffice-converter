import _ from 'lodash';
import errorsConfig from '../configs/errors.config';

export const errorsGenerator = (error, errorsConfigList) => {
  const message = error.message || '';
  let errMsg = null;
  let metaResponse = null;
  try {
    errMsg = JSON.parse(message);
  }
  catch (err) {
    const metaArrays = [];
    if (errorsConfigList && errorsConfigList.length > 0) {
      errorsConfigList.forEach((e) => {
        const errorMessage = _.result(e, 'message', null);
        if (errorMessage && message.includes(e.message)) {
          metaResponse = e;
          metaArrays.push(e);
        }
      });
    }
    if (metaArrays.length > 1) {
      const errors = metaArrays.reduce((result, ma) => {
        result.push({ code: ma.code, message: ma.message });
        return result;
      }, []);
      metaResponse = errorsConfig.MULTIPLE_ERRORS;
      metaResponse.message = errors;
    }
    else if (!metaResponse) {
      if (message.includes('Critical')) {
        metaResponse = errorsConfig.CRITICAL;
        metaResponse.message = message;
      }
      else {
        metaResponse = errorsConfig.UNCATEGORIZED;
        metaResponse.message = message;
      }
    }
  }
  if (typeof errMsg === 'object' && errMsg !== null) {
    metaResponse = errMsg;
  }
  metaResponse.errorStack = error.stack;
  return metaResponse;
};

export default function f() {

}
