import { okResponse } from '../../variables/common.variable';
import { SystemVarFunc } from '../../functions/general/system-variable.function';
import { PublicVariableCategory } from '../../variables/enum.variable';
import { errorsGenerator } from '../../utils/error.util';
import errorsConfig from '../../configs/generals/errors.config';

export const SystemVariableController = {
  async getSingleVariable(req, res, next) {
    const name = 'Get Single Variable';
    try {
      const { code } = req.query;
      const response = await SystemVarFunc.getByCategoryCode(PublicVariableCategory, code);
      const result = Array.isArray(response) ? response[0] : response;
      if (!result) throw new Error(errorsConfig.GENERAL_VARIABLE_NOT_FOUND.message);
      res.status(200).json(okResponse('OK', '00', response, 'Get single variable successful'));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.GENERAL_VARIABLE_NOT_FOUND
      ]);

      next({ req: { ...req }, name, metaResponse });
    }
  },
  async getAllVariables(req, res, next) {
    const name = 'Get All Variable';
    const { code } = req.query;
    try {
      const response = await SystemVarFunc.getByCategoryCode(PublicVariableCategory, code);

      const result = !Array.isArray(response) ? [response] : response;

      res.status(200).json(okResponse('OK', '00', result, 'Get All variable successful'));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, []);

      next({ req: { ...req }, name, metaResponse });
    }
  }
};

export function noop() { }
