import { Types } from 'mongoose';
import OrganizationModel from '../../models/auth/Organization.model';

export const OrganizationFunc = {
  /**
   * Find organization by id.
   * @param {Object} organizationId
   * @returns organization
   */
  async findOne(organizationId) {
    const aggregation = [
      {
        $match: { _id: new Types.ObjectId(organizationId) }
      },
      {
        $limit: 1
      },
      {
        $lookup: {
          from: 'applications',
          localField: '_id',
          foreignField: 'organizationId',
          as: 'applications'
        }
      },
      {
        $project: {
          id: 0
        }
      },
      {
        $set: {
          applications: { $arrayElemAt: ['$applications._id', 0] }
        }
      }
    ];

    const [result] = await OrganizationModel.aggregate(aggregation).exec();

    return result;
  },
  /**
   * Find organization by user.
   * @param {Object} user
   * @returns organization
   */
  async findOrganizationByUser(userId) {
  // console.log(userId.toString());
    return OrganizationModel.find({ 'users.userId': userId.toString() });
  },
  async findOrganizationByUserWithAggregate(userId) {
    return OrganizationModel.aggregate([
      {
        $match: {
          'users.userId': {
            $eq: userId
          },
          'status.organizationStatus': 'ACTIVE'
        }
      },
      {
        $addFields: {
          organizationId: '$_id',
          baCreationStatus: '$status.baCreationStatus',
          applicationStatus: '$status.applicationStatus',
          organizationStatus: '$status.organizationStatus',
          isActive: {
            $cond: [
              {
                $and: [
                  {
                    $eq: ['$status.organizationStatus', 'ACTIVE']
                  }
                ]
              },
              true,
              false
            ]
          },
          selectedUser: {
            $filter: {
              input: '$users',
              as: 'userList',
              cond: {
                $eq: ['$$userList.userId', userId]
              }
            }
          }
        }
      },
      {
        $unwind: {
          path: '$selectedUser',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $addFields: {
          role: '$selectedUser.role',
          userAccess: '$selectedUser.status',
          generatedEmail: '$selectedUser.generatedEmail'
        }
      },
      {
        $project: {
          organizationId: 1,
          companyName: 1,
          role: 1,
          isPremium: 1,
          freemiumDetails: 1,
          isActive: 1,
          userAccess: 1,
          baCreationStatus: 1,
          applicationStatus: 1,
          organizationStatus: 1,
          organizationPlan: 1,
          generatedEmail: 1
        }
      },
      {
        $sort: {
          userAccess: 1,
          companyName: 1
        }
      }
    ]).exec();
  },
  async findById(id) {
    return OrganizationModel.findById(id).lean();
  }

};

export function noop() {}
