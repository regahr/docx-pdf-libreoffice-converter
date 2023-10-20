import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  sourceModule: {
    type: String, default: '', required: true
  },
  type: {
    type: String, default: '', required: true
  },
  message: {
    type: String, default: '', required: true
  },
  isRead: {
    type: Array, required: true
  },
  isHidden: {
    type: Array, required: true
  },
  usersId: {
    type: Array, default: '', required: true
  },
  redirectTo: {
    type: String, default: '', required: true
  },
  icon: new Schema({
    imagePath: { type: String, default: '' },
    imageAlt: { type: String, default: '' }
  }, { _id: false }),

  // TODO-model replaced usersId with createdBy, updatedBy, organizationId
  createdBy: { type: String, required: true },
  updatedBy: { type: String },
  organizationId: {
    type: String, required: true, index: true
  },
  transactionId: {
    type: String, required: false, index: true
  },
  targetId: {
    type: Schema.Types.ObjectId, required: false, index: true
  }
});

schema.set('timestamps', true);

const InAppNotification = mongoose.model('in_app_notifications', schema);

module.exports = InAppNotification;
