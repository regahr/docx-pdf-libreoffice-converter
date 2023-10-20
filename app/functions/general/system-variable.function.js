import SystemVariable from '../../models/SystemVariables.model';

export const SystemVarFunc = {
  async getByCategoryCode(category, code) {
    const result = await SystemVariable.find({ category, code });
    if (result.length === 1) {
      return result[0];
    }
    return result;
  },
  /**
 * For getting variables by category
 * @returns {Promise<string[]>}
 */
  async getEnumByCategory(category) {
    const variables = await SystemVariable.find({
      $or: [
        {
          category
        }
      ]
    });

    return variables.map((x) => x.description);
  },

  /**
 * For getting Currency ISO eg: USD, SGD IDR, MYR
 * @returns {Promise<string[]>}
 */
  async getEnumCurrency() {
    const variables = await SystemVariable.find({
      $or: [
        {
          category: 'COUNTRY'
        },
        {
          category: 'CURRENCY'
        }
      ]
    });

    const result = [];
    const map = {};

    variables.forEach((country) => {
      if (!map[country.value.currencyCode]) {
        map[country.value.currencyCode] = country.value.currencyCode;
        result.push(country.value.currencyCode);
      }
    });

    return result;
  },
  /**
 * For getting Country ISO with 2 Letter length
 * eg.: ID, SG, US
 * @returns {Promise<string[]}
 */
  async getEnumCountryIso2Code() {
    const variables = await SystemVariable.find({
      category: 'COUNTRY'
    });

    return variables.map((x) => x.value.countryIso2Code);
  }

};

export default { SystemVarFunc };
