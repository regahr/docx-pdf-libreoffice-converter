const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  phoneNumber: { type: String },
  emailAddresses: [{ type: String, unique: true }],
  isPhoneNumberVerified: { type: Boolean, default: true },
  isEmailAddressVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  isBlocked: { type: Boolean, default: false },
  wrongPinAttempt: { type: Number, default: 0 },
  pin: { type: String },
  callFirstName: { type: String },
  callLastName: { type: String },
  dialCode: { type: String },
  deviceId: [{ type: String }],
  metaData: {
    isFirstTimeAccess: { type: Boolean, default: false },
    hasShownVerifiedEmailSnackbar: { type: Boolean, default: true },
    isAdminCreated: { type: Boolean, default: false }
  },
  isRequestAccountDeletion: { type: Boolean, default: false }
});

// eslint-disable-next-line func-names
schema.virtual('fullName').get(function () {
  return this.callLastName ? `${this.callFirstName} ${this.callLastName}` : this.callFirstName;
});

schema.set('timestamps', true);

const Users = mongoose.model('users', schema);

module.exports = Users;
