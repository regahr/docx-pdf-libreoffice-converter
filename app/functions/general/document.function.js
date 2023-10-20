import Document from '../../models/kyb/Document.model';

export const DocumentFunc = {
  async create(body) {
    const document = await Document.create({
      ...body
    });

    return document;
  },

  async getById(id) {
    const document = await Document.findById(id);

    return document;
  },

  /**
   * For get all Document with specified organization Id, list of ids and file type
   * @param {string[]} ids
   * @param {string} organizationId
   * @param {string} fileType
   * @returns {Promise<Document[]>}
   */
  async getAllByOrganizationIdFileTypeAndIds(ids, organizationId, fileType) {
    return Document.find({
      _id: {
        $in: ids
      },
      organizationId: {
        $eq: organizationId
      },
      fileType: {
        $eq: fileType
      }
    });
  },

  /**
   * To set value of organizationId by list of id
   * @param {string[]} ids
   * @param {string} organizationId
   * @returns
   */
  async updateOrganizationIdByIds(ids, organizationId) {
    return Document.updateMany({
      _id: {
        $in: ids
      }
    },
    {
      $set: {
        organizationId
      }
    });
  },

  /**
   * For get one Document with specified organization Id, and id
   * @param {string} id
   * @param {string} organizationId
   * @returns {Promise<Document>}
   */
  async getOneByOrganizationIdAndId(id, organizationId) {
    return Document.findOne({
      _id: {
        $eq: id
      },
      organizationId: {
        $eq: organizationId
      }
    });
  }

};

export default function noop() { }
