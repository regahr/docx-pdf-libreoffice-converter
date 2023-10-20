import Application from '../../models/kyb/Application.model';

const ApplicationFunc = {
  async create(payload) {
    return Application.create(payload);
  },

  async findOne(id) {
    const result = await Application.findById(id)
      .populate({ path: 'submittedBy', select: 'callFirstName callLastName' })
      .populate({ path: 'organizationId', select: 'status companyName niumCustomerId niumCaseId niumClientId' });

    return result;
  },

  /**
   * To get Onboard company detail by organizationId including the documents
   * @param {ObjectId} organizationId
   * @returns {Promise<Application>}
   */
  async getOnboardCompanyDetail(organizationId) {
    const [result] = await this.getAll({
      where: {
        $and: [
          {
            organizationId: {
              $eq: organizationId
            }
          }
        ]
      },
      aggregation: [
        {
          $lookup: {
            from: 'documents',
            localField: 'organizationId',
            foreignField: 'organizationId',
            as: 'additionalDocuments'
          }
        }
      ]
    });

    return result;
  }
};

export default ApplicationFunc;
