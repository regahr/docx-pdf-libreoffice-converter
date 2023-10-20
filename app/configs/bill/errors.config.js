import { bugsLevel } from '../../variables/common.variable';

export default {
  EMAIL_BILL_ATTACHMENT_NOT_FOUND: {
    httpStatus: 404,
    level: bugsLevel.MINOR,
    code: '9001',
    message: 'Email bill attachment not found'
  },
  EMAIL_BILL_INVALID_PAYLOAD: {
    httpStatus: 400,
    level: bugsLevel.MINOR,
    code: '9002',
    message: 'Email bill invalid payload'
  }
};

export class EmailBillError extends Error {
  constructor(message, data) {
    super();
    this.message = message;
    this.organizationId = data.organizationId;
    this.userId = data.userId;
    this.recipientEmailAddress = data.recipientEmailAddress;
    this.senderEmailAddress = data.senderEmailAddress;
  }
}
