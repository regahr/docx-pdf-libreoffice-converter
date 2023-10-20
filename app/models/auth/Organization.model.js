const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  companyId: { type: Schema.Types.ObjectId },
  users: [new Schema({
    userId: { type: String },
    status: { type: String },
    role: { type: String },
    generatedEmail: { type: String },
    niumCustomerHashId: { type: String }

  }, { _id: false })],
  companyName: { type: String },
  freemiumDetails: {
    registrationCountry: { type: String },
    primaryCurrency: { type: String },
    uen: { type: String, unique: true }
  },
  subscriptionDetails: {
    startDate: { type: String },
    endDate: { type: String },
    status: { type: String },
    addOns: [String],
    chargebeeId: { type: String }
  },
  businessDetails: {
    businessName: { type: String },
    businessNumber: { type: String },
    businessAddressLine1: { type: String },
    businessAddressLine2: { type: String },
    businessCity: { type: String },
    businessPostalCode: { type: String },
    businessCountry: { type: String },
    businessProvince: { type: String },
    businessEmailAddress: { type: String },
    businessPhoneDialCode: { type: String },
    businessPhoneNumber: { type: String },
    businessMobileDialCode: { type: String },
    businessMobileNumber: { type: String },
    businessWebsite: { type: String }
  },
  isPremium: { type: Boolean, default: false },
  status: {
    baCreationStatus: { type: String, default: 'NEW' },
    applicationStatus: { type: String, default: 'NEW' },
    organizationStatus: { type: String, default: 'ACTIVE' },
    accessLevelStatus: { type: String, default: 'FREEMIUM' },
    artemisStatus: { type: String },
    niumComplianceStatus: { type: String }
  },
  organizationPlan: { type: String, default: 'STARTER' },
  niumCustomerId: { type: String },
  niumCaseId: { type: String },
  niumClientId: { type: String }

});

schema.set('timestamps', true);

const Organization = mongoose.model('organizations', schema);

module.exports = Organization;
