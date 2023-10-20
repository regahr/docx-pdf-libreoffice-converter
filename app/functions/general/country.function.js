import _ from 'lodash';
import SystemVariables from '../../models/SystemVariables.model';

export const CountryFunc = {

  /**
   * Get all country data.
   * @returns all stored country
   */
  async getAllCountries(opt = null) {
    const preferredCountryCodes = _.get(opt, 'preferredCountryCodes', []);
    const preferredCountries = [];
    const otherCountries = [];
    const sysVars = await this.findCountriesWithSort();
    if (sysVars && sysVars.length > 0) {
      sysVars.forEach((sv) => {
        const country = {
          code: sv.code,
          description: sv.description,
          dialCode: sv.value.dialCode,
          countryIso3Code: sv.value.countryIso3Code,
          countryIso2Code: sv.value.countryIso2Code,
          currencyCode: sv.value.currencyCode,
          countryName: sv.value.countryName,
          currencyName: sv.value.currencyName,
          currencySymbol: sv.value.currencySymbol,
          countryFlagUrl: sv.value.countryFlagUrl,
          countryFlagUrlCircle: sv.value.countryFlagUrlCircle
        };
        if (preferredCountryCodes.includes(country.countryIso2Code)) {
          preferredCountries.push(country);
        }
        else {
          otherCountries.push(country);
        }
      });
    }
    return [
      ...preferredCountries,
      ...otherCountries
    ];
  },

  /**
   * Get all currencies.
   * @returns all currencies.
   */
  async getAllCurrencies() {
    const sysVars = await SystemVariables.find({ category: 'COUNTRY' });
    const currencies = [];
    if (sysVars && sysVars.length > 0) {
      sysVars.forEach((sv) => {
        if (currencies.filter((c) => c.code === sv.value.currencyCode).length === 0) {
          currencies.push({
            code: sv.value.currencyCode,
            name: sv.value.currencyName,
            symbol: sv.value.currencySymbol
          });
        }
      });
    }
    return currencies;
  },
  async findCountriesWithSort() {
    return SystemVariables.find({ category: 'COUNTRY' }).sort({ 'value.countryName': 1 });
  }

};

export default { CountryFunc };
