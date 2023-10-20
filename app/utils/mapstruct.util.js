import { postNiumError } from '../services/service.slack';

export function errorResponse(status, code, message) {
  return {
    status,
    code,
    message
  };
}

/**
   * Service Wrapper for Nium Referenced API
   * @param {Promise<Function>} fn
   * @param {{
   * organizationId: string,
   * organizationName: string,
   * niumWalletId: string,
   * niumApi: string
   * }} errorMetadata
   * @param {boolean} isThrow
   * @param {any} defaultResponse
   * @param {Function} additionalErrorFn
   */
export async function niumServiceWrapper(fn, errorMetadata,
  isThrow = true, defaultResponse = null,
  additionalErrorFn = () => {}, additionalSuccessFn = () => {}) {
  try {
    const response = await fn;
    if (!response) {
      if (isThrow) throw new Error('Critical! Nium returned nothing');
      else return defaultResponse;
    }
    additionalSuccessFn(response);
    return response;
  }
  catch (niumError) {
    if (process.env.NODE_ENV !== 'test') {
      postNiumError({ ...errorMetadata, niumResponse: niumError });
    }
    additionalErrorFn(niumError);
    if (isThrow) throw new Error('Critical! Failed to interact with Nium');
    else {
      return defaultResponse;
    }
  }
}

export function noop() {}
