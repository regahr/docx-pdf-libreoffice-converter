import { result } from 'lodash';
import Transaction from '../../models/business-account/Transaction.model';
import { getDatas } from '../../utils/mongo-query-builder.util';
import { GRO_STATUS } from '../../configs/nium/nium-state-list.config';
import { RolePermissionValue } from '../../variables/enum.variable';

export const TransactionFunc = {

  async getAll(opts = null) {
    const isWithMeta = result(opts, 'isWithMeta', false);
    const res = await getDatas(Transaction, opts);

    if (isWithMeta) {
      const mappedData = await this.responseMapperWithAggregation(res.datas);
      return {
        datas: mappedData,
        meta: res.meta
      };
    }
    return this.responseMapperWithAggregation(res);
  },

  async responseMapperWithAggregation(transaction) {
    const results = await Promise.all(transaction.map(async (row) => {
      let status = 'requested';
      if (row.date.niumCompleted) {
        status = 'completed';
      }
      else if (row.date.rejected || row.date.niumRejected) {
        status = 'rejected';
      }
      else if (row.date.approved) {
        status = 'approved';
      }
      if (row.status.compliance === 'RFI_REQUESTED' && row.transactionType !== 'PAYIN') {
        status = 'rfi requested';
      }

      // Transfer Detail || Incoming Transfer || Card Payment
      let method = 'Transfer Detail';
      if (status === 'requested') method = 'Pending Payment';

      let res;

      const bankName = result(row, 'contact.bankName', 'Unknown');
      const accountNumber = result(row, 'contact.accountNumber', 'Unknown');

      if (row.transactionType === undefined || row.transactionType === 'PAYOUT') {
        res = {
          id: row._id,
          amount: row.amount,
          totalFee: row.totalFee,
          totalAmount: row.totalAmount,
          fxRate: row.fxRate,
          paymentMethod: row.paymentMethod,
          transactionID: row.niumTransactionId,
          transaction: row.transactionDesc,
          bankName,
          accountNumber,
          currency: row.currency,
          name: row.name,
          date: row.createdAt,
          purposeOfTransfer: row.purposeOfTransfer,
          reference: row.references,
          status,
          groStatus: row.status.gro,
          type: row.transactionType,
          symbol: '-',
          method,
          createdBy: `${row.createdByFullName}`,
          rawTransactionData: row,
          rawContactData: row.contact
        };
      }
      else if (row.transactionType === 'PAYIN') {
        res = {
          id: row._id,
          amount: row.amount,
          totalFee: row.totalFee,
          totalAmount: row.totalAmount,
          fxRate: row.fxRate,
          paymentMethod: row.paymentMethod,
          transactionID: row.niumTransactionId,
          transaction: row.transactionDesc,
          bankName: '',
          accountNumber: '',
          currency: row.currency,
          name: row.name,
          date: row.createdAt,
          purposeOfTransfer: row.purposeOfTransfer || '-',
          reference: row.references,
          status,
          groStatus: row.status.gro === 'RFI Requested' ? 'Pending' : row.status.gro,
          type: row.transactionType,
          symbol: '+',
          method,
          createdBy: `${row.createdByFullName}`,
          rawTransactionData: row,
          rawContactData: row.sender || {}
        };
      }
      return res;
    }));
    return results;
  },

  /**
* Export transactions
* @returns transaction with mapped data:
*
  - Account Holder Name [excluded]
  - Account Number
  - Transaction date
  - Transaction ID
  - Balance(SGD) [excluded]
  - Reference

  - Deposit(SGD) ⇒ applied only for pay in
  - Transfer(SGD) ⇒ applied only for pay out, will populated by transaction amount

  - Swift charge type(for Pay Out only)
  - Exchange rate(1, 00) ⇒ applied only for FX pay out
  - Category ⇒ applied for pay out, pay in will be “-” (strip sign)
  - Counter Party (Sender Name for PayIn, Contact Name for Payout)
  - Created by ⇒ applied for pay out, for pay in will be NA
*/

  async exportTransactions(startDate, endDate, currency, permission, organizationId) {
    const filter = [
      {
        organizationId
      },
      {
        createdAt: { $gte: new Date(startDate), $lt: new Date(endDate) }
      },
      { 'status.gro': GRO_STATUS.COMPLETED },
      {
        currency
      }
    ];

    if (permission && permission.value === RolePermissionValue.OWN) {
      filter.push({
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
        $match: {
          $and: filter
        }
      },
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
          amountStr: {
            $convert: {
              input: '$amount', to: 'string', onError: '', onNull: ''
            }
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
          $and: [
            {
              paymentMethod: {
                $ne: 'CARD'
              }
            }
          ]
        }
      }
    ];

    const transaction = await Transaction.aggregate(aggregation).exec();

    const results = await this.exportResponseMapper(transaction, currency);
    return results;
  }

};

export default { TransactionFunc };
