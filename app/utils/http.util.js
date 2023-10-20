import axios from 'axios';
import ENDPOINTS from '../configs/api.config';

const baseConfig = {
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 120000,
  withCredentials: false
};

/**
 *
 * @param {string} baseURL
 * @param {string} endpoint
 * @param {string} params
 * @param {import('axios').AxiosRequestConfig} options
 * @returns {import('axios').AxiosPromise}
 */
async function GET(baseURL, endpoint, params = '', options = {}) {
  const config = {
    baseURL,
    ...baseConfig,
    ...options,
    method: 'get',
    url: ENDPOINTS[endpoint] + params
  };
  return axios(config);
}

/**
 *
 * @param {string} baseURL
 * @param {string} endpoint
 * @param {string} params
 * @param {Object} data
 * @param {import('axios').AxiosRequestConfig} options
 * @returns {import('axios').AxiosPromise}
 */
async function POST(baseURL, endpoint, data = {}, params = '', options = {}) {
  const config = {
    baseURL,
    ...baseConfig,
    ...options,
    method: 'post',
    url: ENDPOINTS[endpoint] + params,
    data: JSON.stringify(data)
  };
  return axios(config);
}

/**
 *
 * @param {string} baseURL
 * @param {string} endpoint
 * @param {string} params
 * @param {Object} data
 * @param {import('axios').AxiosRequestConfig} options
 * @returns {import('axios').AxiosPromise}
 */
async function PUT(baseURL, endpoint, data = {}, params = '', options = {}) {
  const config = {
    baseURL,
    ...baseConfig,
    ...options,
    method: 'put',
    url: ENDPOINTS[endpoint] + params,
    data: JSON.stringify(data)
  };
  return axios(config);
}

/**
 *
 * @param {string} baseURL
 * @param {string} endpoint
 * @param {Object} data
 * @param {string} params
 * @param {import('axios').AxiosRequestConfig} options
 * @returns {import('axios').AxiosPromise}
 */
function DELETE(baseURL, endpoint, data = {}, params = '', options = {}) {
  const config = {
    baseURL,
    ...baseConfig,
    ...options,
    method: 'delete',
    url: ENDPOINTS[endpoint] + params,
    data: JSON.stringify(data)
  };
  return axios(config);
}

export default {
  get GET() {
    return GET;
  },
  get POST() {
    return POST;
  },
  get PUT() {
    return PUT;
  },
  get DELETE() {
    return DELETE;
  }
};
