import { result } from 'lodash';
import { postError } from '../services/service.slack';
import { errorResponse } from '../variables/common.variable';
import niumErrorList from '../configs/nium/nium-error-mapping.config';

// eslint-disable-next-line no-unused-vars
export const ErrorHandler = async (err, _req, res, _next) => {
  const { name, metaResponse, req } = err;

  if (req) req.connection = _req.connection;
  if (_req.file && req) {
    // to get metadata file excluding the buffer prop
    const { ...fileData } = _req.file;
    req.file = fileData;
  }

  if (metaResponse) {
    const message = result(metaResponse, 'message', '');
    const deepMessage = message.split('Response: ')[1];
    let readableMessage = message;

    if (deepMessage) {
      try {
        const msgObj = JSON.parse(deepMessage);
        const messageString = result(msgObj, 'errors[0].message', null);
        readableMessage = messageString || msgObj.message;
      }
      catch (e) {
        //
      }
    }

    if (niumErrorList[readableMessage]) {
      const {
        code,
        msg
      } = niumErrorList[readableMessage];
      readableMessage = msg;
      if (code) {
        metaResponse.code = code;
      }
    }

    const reqInstance = req || _req;
    reqInstance.errorStack = metaResponse.errorStack;

    if (process.env.NODE_ENV !== 'test') {
      await postError(reqInstance, name, metaResponse.level, metaResponse.message);
    }
    res.status(metaResponse.httpStatus).json(errorResponse(
      'ERROR',
      metaResponse.code,
      readableMessage
    ));
    return res.end();
  }

  return res.status(404).json(errorResponse(
    'ERROR',
    '44',
    'Route not found!'
  ));
};

export function noop() {}
