/* eslint-disable max-len */
import _ from 'lodash';
import TemporaryDataCache from '../models/TemporaryDataCache.model';
import { NiumApiService } from '../services/service.nium';
import { VariableNameVsNiumConstantMap } from '../variables/enum.variable';
import { niumServiceWrapper } from './mapstruct.util';

export const CacheUtil = {
  /**
   *
   * @param {string} key - key to be used to retrieve data from cache
   * @param {Function} fallbackFunction - function to be called if data is not found in cache
   * @param {string} path - path to be used to retrieve data from fallbackFunction result
   * @param {Function} mapperFunction - function to be called to map data from fallbackFunction result
   * @returns
   */
  async getDataCache(key, fallbackFunction, path, mapperFunction = null) {
    try {
      const dataCache = await TemporaryDataCache.findOne({ key });
      if (dataCache) {
        if (mapperFunction) {
          return dataCache.value.map(mapperFunction);
        }
        return dataCache.value;
      }

      const resultData = await fallbackFunction();
      let result = [];
      if (!Array.isArray(resultData)) {
        result = _.get(resultData, path, []);
        await TemporaryDataCache
          .create({ key, value: result })
          .catch(() => {});
      }
      else if (resultData.length) {
        result = resultData;
        await TemporaryDataCache
          .create({ key, value: result })
          .catch(() => {});
      }

      if (mapperFunction) {
        return result.map(mapperFunction);
      }

      return result;
    }
    catch (e) {
      return [];
    }
  },

  /**
   *
   * @param {string} variableName - name of variable to be retrieved from Nium
   * @param {Function} mapperFunction - function to be called to map data from Nium result
   * @returns {Promise<>}
   */
  async getNiumConstant(variableName, mapperFunction) {
    try {
      const getNiumConstantData = async () => niumServiceWrapper(NiumApiService
        .getCorporateConstant(VariableNameVsNiumConstantMap[variableName]),
      {
        organizationId: null,
        organizationName: null,
        niumWalletId: null,
        niumApi: `getNiumConstant function - ${variableName}`
      });
      const dataCache = await this.getDataCache(
        variableName,
        getNiumConstantData,
        'data',
        mapperFunction
      );
      return dataCache;
    }
    catch (error) {
      return [];
    }
  },

  /**
   *
   * @param {string} variableName - name of variable to be retrieved from Nium
   * @returns {Promise<>}
   */
  async deleteDataCache(variableName) {
    try {
      return TemporaryDataCache.deleteMany({ variableName });
    }
    catch (error) {
      return [];
    }
  }
};

export default function noop() {}
