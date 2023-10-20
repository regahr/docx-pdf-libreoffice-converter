import { errorsGenerator } from '../../utils/error.util';
import { okResponseWithMeta } from '../../variables/common.variable';
import { BillFunc } from '../../functions/bill/bill.function';
import { BillStatus, RolePermissionValue } from '../../variables/enum.variable';
import { generateQuery } from '../../utils/mongo-query-builder.util';

export const BillController = {

  async getBills(req, res, next) {
    const name = 'Get bills';
    try {
      const {
        credentials: {
          organization,
          permission
        }
      } = req;
      const organizationId = organization._id.toString();

      // for updating status when bill overdue
      const overdueBill = await BillFunc.find({
        $and: [
          {
            dueDate: {
              $exists: true
            }
          },
          {
            dueDate: {
              $nin: [null, '']
            }
          },
          {
            status: {
              $in: [BillStatus.APPROVED, BillStatus.PARTIALLY_PAID]
            }
          },
          {
            organizationId: {
              $eq: organizationId
            }
          }
        ]
      });

      const overdueIds = [];

      overdueBill.forEach((bill) => {
        const { dueDate } = bill;
        const date = new Date(dueDate);
        const today = new Date();
        if (date < today) {
          overdueIds.push(bill._id);
        }
      });

      await BillFunc.updateManyBillById(overdueIds, { status: BillStatus.OVERDUE });

      const generatedQuery = generateQuery(req, { excludedFieldFilters: ['organizationId', 'createdBy'] });

      const filter = [
        {
          organizationId: {
            $eq: organizationId
          }
        }
      ];

      if (permission.value === RolePermissionValue.OWN) {
        filter.push({
          createdBy: {
            $eq: permission.userEmailAddress
          }
        });
      }

      // guard for passing illegal organizationId
      if (!generatedQuery.where.$and) {
        generatedQuery.where.$and = filter;
      }
      else {
        generatedQuery.where.$and.push(...filter);
      }

      const aggregationLookUpCreatedBy = [
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
        }
      ];

      const aggregationLookUpContact = [
        {
          $lookup: {
            from: 'contacts',
            localField: 'contactId',
            foreignField: '_id',
            as: 'contact'
          }
        },
        {
          $unwind: {
            path: '$contact',
            preserveNullAndEmptyArrays: true
          }
        }
      ];

      const aggregationLookUpUpdatedBy = [
        {
          $lookup: {
            from: 'users',
            localField: 'updatedBy',
            foreignField: 'emailAddresses',
            as: 'updatedByUser'
          }
        },
        {
          $unwind: {
            path: '$updatedByUser',
            preserveNullAndEmptyArrays: true
          }
        }
      ];

      const aggregationLookUpApprovedBy = [
        {
          $lookup: {
            from: 'users',
            localField: 'approvedBy',
            foreignField: '_id',
            as: 'approvedByUser'
          }
        },
        {
          $unwind: {
            path: '$approvedByUser',
            preserveNullAndEmptyArrays: true
          }
        }
      ];

      const aggregationLookUpPaidBy = [
        {
          $lookup: {
            from: 'users',
            localField: 'paidBy',
            foreignField: '_id',
            as: 'paidByUser'
          }
        },
        {
          $unwind: {
            path: '$paidByUser',
            preserveNullAndEmptyArrays: true
          }
        }
      ];

      const aggregation = [
        ...aggregationLookUpCreatedBy,
        ...aggregationLookUpContact,
        ...aggregationLookUpUpdatedBy,
        ...aggregationLookUpApprovedBy,
        ...aggregationLookUpPaidBy,
        {
          $addFields: {
            stringTotalAmount: {
              $convert: {
                input: '$totalAmount',
                to: 'string',
                onError: '',
                onNull: '-'
              }
            },
            contactName: {
              $ifNull: ['$contact.generalInfoDetail.contactName', '-']
            },
            supplierName: {
              $ifNull: [{
                $arrayElemAt: ['$ocrResult.documents.supplierName', 0]
              }, '-']
            },
            billUploadDate: {
              $convert: {
                input: '$createdAt',
                to: 'string',
                onError: '',
                onNull: ''
              }
            },
            userName: {
              $concat: ['$user.callFirstName', ' ', '$user.callLastName']
            },
            billNumber: {
              $cond: [
                {
                  $and: [
                    {
                      $eq: ['$billNumber', null]
                    }
                  ]
                },
                {
                  $cond: [
                    {
                      $and: [
                        {
                          $eq: ['$ocrResult.documents.invoiceNumber', '']
                        }
                      ]
                    },
                    '-',
                    {
                      $ifNull: [{
                        $arrayElemAt: ['$ocrResult.documents.invoiceNumber', 0]
                      }, '-']
                    }
                  ]
                },
                {
                  $ifNull: ['$billNumber', '-']
                }
              ]
            },
            billCurrency: {
              $ifNull: ['$billCurrency', '-']
            },
            formattedDueDate: {
              $convert: {
                input: '$dueDate',
                to: 'string',
                onError: '',
                onNull: '-'
              }
            },
            updatedBy: {
              $ifNull: ['$updatedBy', null]
            },
            approvedByUsername: {
              $concat: ['$approvedByUser.callFirstName', ' ', '$approvedByUser.callLastName']
            },
            paidByUsername: {
              $concat: ['$paidByUser.callFirstName', ' ', '$paidByUser.callLastName']
            }
          }
        },
        {
          $addFields: {
            updatedByUsername: {
              $cond: [
                {
                  $eq: ['$updatedBy', null]
                },
                null,
                {
                  $concat: ['$updatedByUser.callFirstName', ' f', '$updatedByUser.callLastName']
                }
              ]
            }
          }
        },
        {
          $project: {
            user: 0,
            updatedByUser: 0,
            approvedByUser: 0,
            paidByUser: 0
          }
        },
        {
          $unset: 'ocrResult'
        }
      ];

      const billData = await BillFunc.getAll({ ...generatedQuery, aggregation, isWithMeta: true });

      const response = okResponseWithMeta('OK', '00', billData.datas, billData.meta, name);
      res.status(200).json(response);
    }
    catch (error) {
      const metaResponse = errorsGenerator(error, []);

      next({ req: { ...req }, name, metaResponse });
    }
  }

};

export function noop() { }
