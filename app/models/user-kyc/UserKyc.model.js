const mongoose = require('mongoose');

const { Schema } = mongoose;
const paymentIds = new Schema({
  currencyCode: { type: String },
  uniquePaymentId: { type: String },
  uniquePayerId: { type: String },
  bankName: { type: String }
}, { _id: false });
const schema = new Schema({
  callFirstName: { type: String },
  callLastName: { type: String },
  inviteURL: { type: String },
  urlExpiredDate: { type: Date },
  status: { type: String },
  dialCode: { type: String },
  phoneNumber: { type: String },
  emailAddress: { type: String },
  legalDetails: {
    legalFirstName: { type: String },
    legalLastName: { type: String }
  },
  personalDetails: {
    gender: { type: String },
    nationality: { type: String },
    dateOfBirth: { type: String },
    countryOfBirth: { type: String },
    countryOfResidence: { type: String },
    emailAddress: { type: String },
    dialCode: { type: String },
    phoneNumber: { type: String }
  },
  documents: [{ type: Schema.Types.ObjectId }],
  address: {
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    postcode: { type: String },
    country: { type: String },
    blockHouse: { type: String },
    streetName: { type: String },
    buildingName: { type: String },
    level: { type: String },
    unit: { type: String }
  },
  riskProfileAssessment: {
    occupation: { type: String },
    sourceOfIncome: { type: String },
    isPep: { type: Boolean }
  },
  kycStatus: {
    isIdVerificated: { type: Boolean },
    isBackgroundScreened: { type: Boolean }
  },
  organizationDetail: {
    invitedOrganization: {
      type: Schema.Types.ObjectId,
      ref: 'organizations'
    },
    associatedOrganization: [{
      type: Schema.Types.ObjectId,
      ref: 'organizations'
    }],
    invitationDate: { type: Date, default: Date.now() },
    employeeId: { type: String },
    employeeDialCode: { type: String },
    employeePhoneNumber: { type: String },
    employeeEmailAddress: { type: String }
  },
  isMatchWithUser: { type: Schema.Types.ObjectId },
  role: { type: String },
  relationshipWithCompany: [{ type: String }],
  userId: { type: Schema.Types.ObjectId },
  personId: { type: Schema.Types.ObjectId },
  memberId: { type: Schema.Types.ObjectId },
  niumUnifiedCustomer: {
    customerHashId: { type: String },
    walletHashId: { type: String },
    paymentIds: { type: [paymentIds] }
  },
  niumComplianceStatus: { type: String },
  niumKycStatus: { type: String }
});

schema.set('timestamps', true);

const UserKyc = mongoose.model('users_kyc', schema);

module.exports = UserKyc;
