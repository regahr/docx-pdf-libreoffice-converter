import { result } from 'lodash';
import errorsConfig from '../../configs/business-account/errors.config';
import { TransactionFunc } from '../../functions/business-account/transaction.function';
import { errorsGenerator } from '../../utils/error.util';
import { okResponse, okResponseWithMeta } from '../../variables/common.variable';
import { generateQuery } from '../../utils/mongo-query-builder.util';
import { RolePermissionValue } from '../../variables/enum.variable';

export const TransactionController = {

  async getTransactions(req, res, next) {
    const name = 'Get transactions';
    try {
      let { organizationId } = req.query;
      if (!organizationId) {
        organizationId = result(req, 'credentials.organization._id', '').toString();
      }

      // update async the card nium transaction status
      // TransactionFunc.syncNiumCardTransaction(organizationId).catch((error) => {
      //   EventLogFunc.save('Nium Card Transaction Sync', {
      //     errMsg: error.message,
      //     organizationId
      //   });
      // });
      // const userEmail = req.credentials.user.emailAddresses[0];
      const excludedFieldFilters = ['organizationId'];
      const permission = result(req, 'credentials.permission', {});
      const permissionValue = result(req, 'credentials.permission.value', '');
      if (permissionValue === RolePermissionValue.OWN) {
        excludedFieldFilters.push('createdBy');
        excludedFieldFilters.push('transactionType');
      }
      const generatedQuery = generateQuery(req, { excludedFieldFilters });

      // guard for passing illegal organizationId
      if (!generatedQuery.where.$and) {
        generatedQuery.where.$and = [
          {
            organizationId: {
              $eq: organizationId
            }
          }
        ];
      }
      else {
        generatedQuery.where.$and.push({
          organizationId: {
            $eq: organizationId
          }
        });
        if (req.query.search && (req.query.search.includes('rfi'))) {
          generatedQuery.where.$and.push({
            transactionType: {
              $ne: 'PAYIN'
            }
          });
        }
      }

      if (permissionValue === RolePermissionValue.OWN) {
        generatedQuery.where.$and.push({
          $or: [
            {
              createdBy: {
                $eq: permission.userEmailAddress
              }
            },
            {
              transactionType: {
                $eq: 'PAYIN'
              }
            }
          ]
        });
      }

      const aggregation = [
        {
          $lookup: {
            from: 'users',
            localField: 'createdBy',
            foreignField: 'emailAddresses',
            as: 'user'
          }
        },
        {
          $unwind: {
            path: '$user',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $addFields: {
            amountAsDecimal: {
              $round: ['$amount', 2]
            },
            destinationAmountAsDecimal: {
              $round: ['$destinationAmount', 2]
            },
            createdByFullName: {
              $concat: ['$user.callFirstName', ' ', '$user.callLastName']
            },
            date: {
              $convert: {
                input: '$createdAt',
                to: 'string',
                onError: '',
                onNull: ''
              }
            },
            transactionDesc: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ['$transactionType', 'PAYOUT']
                    }
                  ]
                },
                {
                  $concat: [
                    'Transfer to ',
                    {
                      $ifNull: [
                        {
                          $trim: {
                            input: '$contact.bankName'
                          }
                        },
                        'Unknown'
                      ]
                    },
                    ' - ',
                    {
                      $ifNull: ['$contact.accountNumber', 'Unknown']
                    }
                  ]
                },
                {
                  $concat: [
                    'Received from ',
                    {
                      $ifNull: ['$sender.bankName', 'Unknown']
                    },
                    ' (',
                    {
                      $ifNull: ['$sender.iccSource', 'Unknown']
                    },
                    ') - ',
                    {
                      $ifNull: ['$sender.accountNumber', 'Unknown']
                    }
                  ]
                }
              ]
            },
            name: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ['$transactionType', 'PAYOUT']
                    }
                  ]
                },
                {
                  $ifNull: ['$contact.name', 'Unknown']
                },
                {
                  $ifNull: ['$sender.name', 'Unknown']
                }
              ]
            },
            references: {
              $cond: [
                {
                  $and: [
                    {
                      $ne: ['$references', null]
                    }
                  ]
                },
                {
                  $trim: {
                    input: {
                      $toString: '$references'
                    }
                  }
                },
                '-'
              ]
            }
          }
        },
        {
          $project: {
            user: 0
          }
        },
        {
          $match: {
            paymentMethod: {
              $ne: 'CARD'
            }
          }

        }
      ];

      const transactionData = await TransactionFunc
        .getAll({ ...generatedQuery, aggregation, isWithMeta: true });
      if (!transactionData) throw new Error('Critical! Failed to interact with database');
      const response = okResponseWithMeta('OK', '00', transactionData.datas, transactionData.meta, name);
      res.status(200).json(response);
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.BA_TRANSACTION_LIST_EMPTY
      ]);
      next({ req: { ...req }, name, metaResponse });
    }
  },

  async exportTransactions(req, res, next) {
    const name = 'Export transactions history';
    try {
      let { organizationId } = req.query;
      if (!organizationId) {
        organizationId = result(req, 'credentials.organization._id', '').toString();
      }
      const permission = result(req, 'credentials.permission', {});
      const userEmail = result(req, 'credentials.user.emailAddresses', null);
      const { startDate, endDate, currency } = req.query;
      let selectedCurrency = 'SGD';
      if (currency) {
        selectedCurrency = currency;
      }

      const response = await TransactionFunc
        .exportTransactions(startDate, endDate, selectedCurrency, permission, organizationId);
      if (!response) throw new Error('Critical! Failed to interact with database');

      if (userEmail) {
        // TransactionTrack.trackStatementExported(req.query, userEmail, organizationId);
      }
      res.status(200).json(okResponse('OK', '00', response, name));
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, [
        errorsConfig.BA_TRANSACTION_LIST_EMPTY
      ]);
      next({ req: { ...req }, name, metaResponse });
    }
  }

};

export default { TransactionController };
