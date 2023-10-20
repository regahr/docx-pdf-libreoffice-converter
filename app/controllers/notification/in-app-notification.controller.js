import lodash from 'lodash';
import inAppNotificationErrorsConfig from '../../configs/errors/in-app-notification.config';
import {
  okResponse, okResponseWithMeta
} from '../../variables/common.variable';
import { InAppNotificationFunc } from '../../functions/notification/in-app-notification.function';
import { generateQuery } from '../../utils/mongo-query-builder.util';
import { errorsGenerator } from '../../utils/error.util';

export const InAppNotificationController = {
  async getData(req, res, next) {
    const name = 'Get All In App Notification';
    try {
      const organizationId = req.credentials.organization._id.toString();
      const userId = req.credentials.user._id.toString();
      const generatedQuery = generateQuery(req, { excludedFieldFilters: ['usersId', 'organizationId'] });

      // guard for passing illegal userId
      if (!generatedQuery.where.$and) {
        generatedQuery.where.$and = [
          {
            usersId: {
              $eq: userId
            }
          },
          {
            organizationId: {
              $eq: organizationId
            }
          }
        ];
      }
      else {
        generatedQuery.where.$and.push(...[
          {
            usersId: {
              $eq: userId
            }
          },
          {
            organizationId: {
              $eq: organizationId
            }
          }
        ]);
      }

      const aggregation = [
        {
          $addFields: {
            transactionIdObj: {
              $convert: {
                input: '$transactionId', to: 'objectId', onError: '', onNull: ''
              }
            }
          }
        },
        {
          $lookup: {
            from: 'transactions',
            localField: 'transactionIdObj',
            foreignField: '_id',
            as: 'transaction'
          }
        },
        {
          $unwind: {
            path: '$transaction',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            transactionIdObj: 0
          }
        }
      ];

      // eslint-disable-next-line max-len
      const resultData = await InAppNotificationFunc.getAll({ ...generatedQuery, aggregation, isWithMeta: true });
      if (!resultData) throw new Error('Critical failure, can\'t get data');

      const mappedNotifications = resultData.datas.map((notif) => {
        const newNotif = lodash.cloneDeep(notif);
        let isActionRequired = false;
        if (notif.transaction) {
          const groStatus = lodash.result(notif, 'transaction.status.gro', '');
          if (groStatus === 'RFI Requested' || groStatus === 'Draft') isActionRequired = true;
          delete newNotif.transaction;
        }

        newNotif.isActionRequired = isActionRequired;

        return newNotif;
      });

      res.status(200).json(okResponseWithMeta('OK', '00', mappedNotifications, resultData.meta, 'Get all In App Notification successful'));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        inAppNotificationErrorsConfig.NOT_FOUND
      ]);
      next({ req: { ...req }, name, metaResponse });
    }
  },

  async createData(req, res, next) {
    const name = 'Create Notification';
    try {
      const data = await InAppNotificationFunc.createData(req.body,
        req.credentials.user.emailAddress, req.credentials.organization._id.toString());
      if (!data) throw new Error('Critical failure, can\'t create data');
      res.status(200).json(okResponse('OK', '00', data, 'Create Notification successful'));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        inAppNotificationErrorsConfig.NOT_FOUND
      ]);
      next({ req: { ...req }, name, metaResponse });
    }
  },

  async updateIsRead(req, res, next) {
    const name = 'Update Is Read';
    try {
      const data = await InAppNotificationFunc.updateIsRead(req.body,
        req.credentials.user);
      if (!data) throw new Error('Critical failure, can\'t update data');
      res.status(200).json(okResponse('OK', '00', data, 'Update is read successful'));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        inAppNotificationErrorsConfig.NOT_FOUND
      ]);
      next({ req: { ...req }, name, metaResponse });
    }
  }

};

export function noop() {}
