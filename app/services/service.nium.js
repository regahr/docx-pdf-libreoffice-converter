/* eslint-disable max-len */
import { result } from 'lodash';
import { protocol } from '../variables/common.variable';
import http from '../utils/http.util';
import envConfig from '../configs/env.config';

export const NiumApiService = {

  // === CUSTOMER MANAGEMENT === //

  /**
   * Get and formed TnC
   * @returns {Promise<{name: string, versionId: string, description: string, createdAt}>}
   */
  async getTermsAndCondition() {
    const baseURL = `${protocol.HTTPS}${envConfig.nium.apiUrl}`;

    const options = {};
    options.headers = {
      'Content-Type': 'application/json',
      'x-api-key': envConfig.nium.apiKey
    };
    options.data = '';

    return http.GET(baseURL, 'NIUM_GET_TNC', '', options)
      .then((response) => {
        if (response.status === 200) return response.data;
        throw response;
      }).catch((err) => {
        if (result(err, 'response.data', '') !== '') {
          throw new Error(`Message: ${result(err, 'response.data.message', '')}; URL: ${result(err, 'response.config.url', '')}; Response: ${JSON.stringify(result(err, 'response.data', {}))}`);
        }
        else {
          throw new Error(`Critical failure, message: ${err.message}`);
        }
      });
  },

  // === WALLET MANAGEMENT === //

  /**
   * Transfer money from one wallet to another
   * @param {string} customerHashId
   * @param {string} walletHashId
   * @param {import('./types').RequestP2PTransfer} transfer
   * @returns {Promise<any>}
   */
  async p2pTransfer(customerHashId, walletHashId, transfer) {
    const baseURL = `${protocol.HTTPS}${envConfig.nium.apiUrl}`;

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': envConfig.nium.apiKey
      }
    };

    return http.POST(baseURL, 'NIUM', transfer, `/customer/${customerHashId}/wallet/${walletHashId}/p2pTransfer`, options)
      .then((response) => {
        if (response.status === 200) return response.data;
        throw response;
      }).catch((err) => {
        if (result(err, 'response.data', '') !== '') {
          throw new Error(`Message: ${result(err, 'response.data.message', '')}; URL: ${result(err, 'response.config.url', '')}; Response: ${JSON.stringify(result(err, 'response.data', {}))}`);
        }
        else {
          throw new Error(`Critical failure, message: ${err.message}`);
        }
      });
  },

  /**
   * Fetch wallet balance
   * @param {string} clientName
   * @param {string} customerHashId
   * @param {string} walletHashId
   * @returns {Promise<any>}
   */
  async getWallets(customerHashId, walletHashId) {
    const baseURL = `${protocol.HTTPS}${envConfig.nium.apiUrl}`;

    const options = {
      headers: {
        'x-api-key': envConfig.nium.apiKey,
        'x-customer-hash-id': customerHashId
      }
    };

    return http.GET(baseURL, 'NIUM', `/customer/${customerHashId}/wallet/${walletHashId}`, options)
      .then((response) => {
        if (response.status === 200) return response.data;
        throw response;
      }).catch((err) => {
        if (result(err, 'response.data', '') !== '') {
          throw new Error(`Message: ${result(err, 'response.data.message', '')}; URL: ${result(err, 'response.config.url', '')}; Response: ${JSON.stringify(result(err, 'response.data', {}))}`);
        }
        else {
          throw new Error(`Critical failure, message: ${err.message}`);
        }
      });
  },

  // === VIRTUAL ACCOUNT === //
  /**
   *
   * @param {string} customerHashId
   * @param {string} walletHashId
   * @returns {Promise<any>}
   */
  async getVirtualAccount(customerHashId, walletHashId) {
    const baseURL = `${protocol.HTTPS}${envConfig.nium.apiUrl}`;

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': envConfig.nium.apiKey
      }
    };

    return http.GET(baseURL, 'NIUM', `/customer/${customerHashId}/wallet/${walletHashId}/paymentIds`, options).then((response) => {
      if (response.status === 200) return response.data;
      throw response;
    }).catch((err) => {
      if (result(err, 'response.data', '') !== '') {
        throw new Error(`Message: ${result(err, 'response.data.message', '')}; URL: ${result(err, 'response.config.url', '')}; Response: ${JSON.stringify(result(err, 'response.data', {}))}`);
      }
      else {
        throw new Error(`Critical failure, message: ${err.message}`);
      }
    });
  },

  /**
   *
   * @param {string} customerHashId
   * @param {string} walletHashId
   * @returns {Promise<any>}
   */
  async assignVirtualAccount(customerHashId, walletHashId, payload) {
    const baseURL = `${protocol.HTTPS}${envConfig.nium.apiUrl}`;

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': envConfig.nium.apiKey
      }
    };

    return http.POST(baseURL, 'NIUM', payload, `/customer/${customerHashId}/wallet/${walletHashId}/paymentId`, options).then((response) => {
      if (response.status === 200) return response.data;
      throw response;
    }).catch((err) => {
      if (result(err, 'response.data', '') !== '') {
        throw new Error(`Message: ${result(err, 'response.data.message', '')}; URL: ${result(err, 'response.config.url', '')}; Response: ${JSON.stringify(result(err, 'response.data', {}))}`);
      }
      else {
        throw new Error(`Critical failure, message: ${err.message}`);
      }
    });
  },

  // === Transfer Money V2 === //

  /**
   *
   * @param {string} customerHashId
   * @param {string} walletHashId
   * @param {string} sourceCurrency
   * @param {string} destinationCurrency
   * @returns {Promise<any>}
   */
  async getExchangeRate(customerHashId, walletHashId, sourceCurrency, destinationCurrency) {
    const baseURL = `${protocol.HTTPS}${envConfig.nium.apiUrl}`;

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': envConfig.nium.apiKey
      },
      params: {
        sourceCurrency,
        destinationCurrency
      }
    };

    return http.GET(baseURL, 'NIUM', `/customer/${customerHashId}/wallet/${walletHashId}/lockExchangeRate`, options).then((response) => {
      if (response.status === 200) return response.data;
      throw response;
    }).catch((err) => {
      if (result(err, 'response.data', '') !== '') {
        throw new Error(`Message: ${result(err, 'response.data.message', '')}; URL: ${result(err, 'response.config.url', '')}; Response: ${JSON.stringify(result(err, 'response.data', {}))}`);
      }
      else {
        throw new Error(`Critical failure, message: ${err.message}`);
      }
    });
  },

  // === Compliance === //

  /**
   * To Get Nium Constanta for onboarding purpose
   * @param {'annualTurnover' | 'industrySector' | 'listedExchange', 'intendedUseOfAccount' } category
   * @returns {Promise<>}
   */
  async getCorporateConstant(
    category
  ) {
    const baseURL = `${protocol.HTTPS}${envConfig.nium.apiUrlV2}`;
    if (!envConfig.nium.region) throw new Error('Critical failure!, NIUM Region not yet set on env!');

    const options = {
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': envConfig.nium.apiKey
      },
      params: {
        category,
        type: 'CORPORATE',
        region: envConfig.nium.region
      }
    };

    return http.GET(baseURL, 'NIUM_ONBOARDING_CONSTANT', '', options).then((response) => {
      if (response.status === 200) return response.data;
      throw response;
    }).catch((err) => {
      if (result(err, 'response.data', '') !== '') {
        throw new Error(`Message: ${result(err, 'response.data.message', '')}; URL: ${result(err, 'response.config.url', '')}; Response: ${JSON.stringify(result(err, 'response.data', {}))}`);
      }
      else {
        throw new Error(`Critical failure, message: ${err.message}`);
      }
    });
  }

};

export function noop() {}
