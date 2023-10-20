/* eslint-disable no-await-in-loop */
import {
  VariableNameVsCategoryMap,
  NiumSourcedVariableNames,
  AllVariablesName
} from '../../variables/enum.variable';
import SystemVariable from '../../models/SystemVariables.model';

import { CacheUtil } from '../../utils/cache.util';
import { SystemVarFunc } from './system-variable.function';

const GeneralFunc = {
  /**
   *
   * @param {string|string[]} data
   * name of the possible variables to be retrieved, example:
   * - CompanyType
   * - GenderType
   * - EntityStatus
   * - DocumentIDType
   * - EntityType
   * - AppointmentStatus
   * - Source of Income
   * - Position
   * - Occupation
   * - PrimaryIndustry
   * - NiumProductType
   * - NiumProgramType
   * - ShareType
   * - PaymentMode
   * - OnboardingMode
   * - ArtemisStatus
   * - RiskScore
   * - RiskRating
   * - ApplicationStatus
   * - OwnershipLayer
   * - ProductComplexity
   * - NiumKYBDocumentType
   * - NiumDocumentType
   * - NiumPositionRFI
   * - NiumDocumentTypesForBusiness
   * - Currency
   * - CurrencyCodes
   * - Countries
   * - Nationality
   * - Country of Birth/Country/Country of Residence
   * - IntendedUseOfAccount (Nium)
   * - TotalEmployees (Nium)
   * - AnnualTurnOver (Nium)
   * - IndustrySector (Nium)
   * - ListedExchange (Nium)
   * @returns
   */
  async getData(data) {
    // eslint-disable-next-line no-unused-expressions, no-param-reassign
    typeof (data) === 'string' ? data = [data] : data;
    const selectedData = [];
    if (data === undefined) {
      // eslint-disable-next-line no-param-reassign
      data = AllVariablesName;
    }
    // eslint-disable-next-line no-restricted-syntax
    for (const variableName of data) {
      let result;
      if (['Currency', 'CurrencyCodes'].includes(variableName)) {
        const constants = await CacheUtil.getDataCache(
          variableName,
          SystemVarFunc.getEnumCurrency,
          '',
          null
        );
        if (variableName === 'Currency') {
          result = {
            CurrencyISO3Letter: constants
          };
        }
        else if (variableName === 'CurrencyCodes') {
          result = {
            CurrencyCodes: constants
          };
        }
      }
      else if (['Nationality', 'Country of Birth/Country/Country of Residence'].includes(variableName)) {
        result = {
          CountryISO2Letter: await CacheUtil.getDataCache(
            variableName,
            SystemVarFunc.getEnumCountryIso2Code,
            '',
            null
          )
        };
      }
      else if (NiumSourcedVariableNames.includes(variableName)) {
        const mapResponse = {
          IntendedUseOfAccount: 'IntendedUseOfAccount',
          TotalEmployees: 'EmployeesSizeType',
          AnnualTurnOver: 'TurnOverType',
          IndustrySector: 'IndustrySectorType',
          ListedExchange: 'ListedExchange'
        };
        const vars = await SystemVarFunc
          .getEnumByCategoryWithCodeDescriptionSchema(VariableNameVsCategoryMap[variableName]);
        let constant = await CacheUtil.getDataCache(
          variableName,
          async () => vars,
          '',
          (item) => ({
            value: item.code,
            label: item.description
          })
        );
        if (!constant.length || (vars.length && vars[0].createdAt < new Date() - 86400000)) {
          if ((vars.length && vars[0].createdAt.getTime() < new Date().getTime() - 86400000)) {
            await CacheUtil.deleteDataCache(variableName);
          }
          constant = await CacheUtil.getNiumConstant(
            variableName,
            (item) => ({
              value: item.code,
              label: item.description
            })
          );
          await SystemVariable.deleteMany({ category: VariableNameVsCategoryMap[variableName] });
          constant.forEach((res, index) => {
            SystemVariable.create({
              category: VariableNameVsCategoryMap[variableName],
              code: `${VariableNameVsCategoryMap[variableName]}_${index}`,
              description: `${res.value} - ${res.label}`,
              value: {
                code: res.value,
                description: res.label
              }
            });
          });
        }
        result = {
          [mapResponse[variableName]]: constant
        };
      }
      else if (variableName === 'BillPaymentType') {
        result = {
          [variableName]: await CacheUtil.getDataCache(
            variableName,
            async () => SystemVarFunc
              .getEnumByCategoryWithCodeDescriptionSchema(VariableNameVsCategoryMap[variableName]),
            '',
            null
          )
        };
      }
      else {
        result = {
          [variableName]: await CacheUtil.getDataCache(
            variableName,
            async () => SystemVarFunc
              .getEnumByCategory(VariableNameVsCategoryMap[variableName]),
            '',
            null
          )
        };
      }

      if (result) selectedData.push(result);
    }
    return selectedData;
  }

};

export default GeneralFunc;
