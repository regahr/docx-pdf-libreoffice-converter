import inAppNotificationErrorsConfig from '../../configs/errors/in-app-notification.config';
import InAppNotificationModel from '../../models/notification/InAppNotification.model';
import { IANService } from '../../services/service.ian';
import { getDatas } from '../../utils/mongo-query-builder.util';

export const InAppNotificationFunc = {
  async getData(organization) {
    const fetchedData = await InAppNotificationModel
      .find({ organizationId: organization._id.toString() })
      .sort({ updatedAt: -1 });
    if (!fetchedData) throw new Error(inAppNotificationErrorsConfig.NOT_FOUND.message);

    return fetchedData;
  },

  async getAll(opts = null) {
    return getDatas(InAppNotificationModel, opts);
  },

  async updateIsRead(dataBody, user) {
    const { _id } = dataBody;
    const query = { _id };
    const datarow = await InAppNotificationModel.findOne(query);
    const isRead = [];
    let sameId = false;
    datarow.isRead.forEach((row) => {
      isRead.push(row);
      if (row === user._id.toString())sameId = true;
    });
    if (!sameId) isRead.push(user._id.toString());
    const savedData = await InAppNotificationModel.findOneAndUpdate(
      query,
      { isRead }
    );
    if (!savedData) throw new Error(inAppNotificationErrorsConfig.SUBMITTED.message);
    return savedData;
  },

  async createData(dataBody, userEmail, organizationId) {
    const dataInsert = dataBody;
    dataInsert.message = '';
    const setIAN = await IANService.setIAN(dataBody);
    dataInsert.message = setIAN.message;
    dataInsert.icon = setIAN.icon;
    if (setIAN.message === '') throw new Error(inAppNotificationErrorsConfig.SUBMITTED.message);
    dataInsert.organizationId = organizationId;
    dataInsert.createdBy = userEmail;

    const savedData = await InAppNotificationModel.create(dataInsert);
    if (!savedData) throw new Error(inAppNotificationErrorsConfig.SUBMITTED.message);
    return savedData;
  },

  async getOneByQuery(query) {
    return InAppNotificationModel.findOne(query);
  },

  async createMany(data) {
    return InAppNotificationModel.insertMany(data);
  }
};

export function noop() {}
