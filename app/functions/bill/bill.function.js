/* eslint-disable no-shadow */
/* eslint-disable no-underscore-dangle */
import _ from 'lodash';
import errorsConfig from '../../configs/errors.config';
import BillModel from '../../models/bill/Bill.model';

import { getDatas } from '../../utils/mongo-query-builder.util';

export const BillFunc = {

  async getAll(opts = null) {
    const isWithMeta = _.result(opts, 'isWithMeta', false);
    const res = await getDatas(BillModel, opts);

    if (isWithMeta) {
      const mappedData = res.datas;
      return {
        datas: mappedData,
        meta: res.meta
      };
    }
    return res;
  },

  async find(query) {
    const result = await BillModel.find(query);
    if (!result) throw new Error(errorsConfig.BILL_NOT_FOUND.message);
    return result;
  },

  async updateManyBillById(ids, payload) {
    const result = await BillModel.updateMany({ _id: { $in: ids } },
      {
        $set: payload
      });
    return result;
  }

};

export function noop() {}
