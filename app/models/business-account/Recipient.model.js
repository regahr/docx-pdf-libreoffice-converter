const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  niumBeneficiaryId: { type: String },
  name: { type: String },
  email: { type: String },
  alias: { type: String },
  identificationType: { type: String },
  identificationValue: { type: String },
  contactCountryCode: { type: String },
  contactNumber: { type: String },
  addressDetails: {
    addressLine: { type: String },
    city: { type: String },
    state: { type: String },
    postCode: { type: String },
    countryCode: { type: String }
  },
  bankDetails: {
    accountNumber: { type: String },
    accountType: { type: String },
    bankName: { type: String },
    bankAccountType: { type: String },
    bankCode: { type: String },
    routingCodeType1: { type: String },
    routingCodeValue1: { type: String },
    routingCodeType2: { type: String },
    routingCodeValue2: { type: String }
  },
  remittanceDetails: {
    destinationCountry: { type: String },
    destinationCurrency: { type: String },
    remitterRelationship: { type: String },
    proxyType: { type: String },
    proxyValue: { type: String },
    payoutMetadata: {
      payoutMethod: { type: String },
      payoutHashId: { type: String },
      payoutCreatedAt: { type: String },
      payoutUpdatedAt: { type: String }
    }
  },
  cardDetails: {
    cardIssuerName: { type: String },
    cardExpiryDate: { type: String },
    cardType: { type: String },
    cardToken: { type: String },
    cardNumberMask: { type: String },
    cardMetadata: {
      cardTypeCode: { type: String },
      billingCurrencyCode: { type: String },
      billingCurrencyMinorDigits: { type: String },
      issuerName: { type: String },
      cardIssuerCountryCode: { type: String },
      fastFundsIndicator: { type: String },
      pushFundsBlockIndicator: { type: String },
      onlineGambingBlockIndicator: { type: String },
      isCardValid: { type: String },
      isBankSupported: { type: String }
    }
  },
  niumCreatedAt: { type: String },
  niumUpdatedAt: { type: String },
  // TODO-model replace usersId with createdBy, updatedBy, organizationId
  createdBy: { type: String, required: true },
  updatedBy: { type: String },
  organizationId: {
    type: String, required: true, index: true
  }
});

schema.set('timestamps', true);

const Recipient = mongoose.model('recipients', schema);

module.exports = Recipient;
