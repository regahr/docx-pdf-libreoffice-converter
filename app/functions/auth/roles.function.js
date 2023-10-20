import _ from 'lodash';
import Roles from '../../models/auth/Roles.model';
import { getDatas } from '../../utils/mongo-query-builder.util';

export const RoleFunc = {
  async getAll(opts = null) {
    const isWithMeta = _.result(opts, 'isWithMeta', false);
    const res = await getDatas(Roles, opts);

    if (isWithMeta) {
      const mappedData = res.datas;
      return {
        datas: mappedData,
        meta: res.meta
      };
    }
    return res;
  }
};

export function noop() {}
