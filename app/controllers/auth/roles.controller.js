import { errorsGenerator } from '../../utils/error.util';
import { generateQuery } from '../../utils/mongo-query-builder.util';
import { okResponseWithMeta } from '../../variables/common.variable';
import { RoleFunc } from '../../functions/auth/roles.function';

export const RolesController = {
  async getAll(req, res, next) {
    const name = 'Get all roles';
    try {
      const generatedQuery = generateQuery(req);
      const result = await RoleFunc.getAll({ ...generatedQuery, isWithMeta: true });

      const response = okResponseWithMeta('OK', '00', result.datas, result.meta, name);
      res.status(200).json(response);
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, []);

      next({ req: { ...req }, name, metaResponse });
    }
  }

};

export function noop() { }
