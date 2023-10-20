import { CountryFunc } from '../../functions/general/country.function';
import { okResponse } from '../../variables/common.variable';
import { errorsGenerator } from '../../utils/error.util';

export const CountryController = {

  async getAllCountries(req, res, next) {
    const name = 'Get All Countries';
    try {
      const preferredCountryCodes = req.query.preferredCountryCodes ? req.query.preferredCountryCodes.split(',') : ['SG'];
      const response = await CountryFunc.getAllCountries(
        {
          preferredCountryCodes
        }
      );
      if (!response) throw new Error('Critical! Failed to interact with database');
      res.status(200).json(okResponse('OK', '00', response, 'Get all countries successful'));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, []);
      next({ req: { ...req }, name, metaResponse });
    }
  },

  async getAllCurrencies(req, res, next) {
    const name = 'Get All Currencies';
    try {
      const response = await CountryFunc.getAllCurrencies();
      if (!response) throw new Error('Critical! Failed to interact with database');
      res.status(200).json(okResponse('OK', '00', response, 'Get all currencies successful'));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, []);
      next({ req: { ...req }, name, metaResponse });
    }
  }
};

export function noop() { }
