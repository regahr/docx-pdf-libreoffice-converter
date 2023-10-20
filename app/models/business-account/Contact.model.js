import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  createdBy: { type: String, required: true },
  updatedBy: { type: String },
  organizationId: {
    type: String, required: true, index: true
  },
  generalInfoDetail: new Schema({
    contactName: {
      type: String, maxLength: 40, required: true
    },
    accountType: {
      type: String
    },
    firstName: { type: String, maxLength: 40 },
    lastName: { type: String, maxLength: 40 },
    emailAddress: {
      type: String,
      lowercase: true,
      trim: true,
      maxLength: 40,
      index: true
    },
    phoneDialCode: { type: String },
    phoneNumber: { type: String },
    type: new Schema({
      customer: { type: Boolean },
      vendor: { type: Boolean }
    }, { _id: false }),
    notes: { type: String, maxLength: 200 },
    addressLine1: { type: String },
    addressLine2: { type: String },
    postalCode: { type: String },
    country: { type: String },
    city: {
      type: String,
      required: false
    },
    state: {
      type: String,
      required: false
    },
    blockHouse: {
      type: String,
      required: false
    },
    streetName: {
      type: String,
      required: false
    },
    buildingName: {
      type: String,
      required: false
    },
    level: {
      type: String,
      required: false
    },
    unit: {
      type: String,
      required: false
    }
  }, { _id: false }),
  bankAccountDetail: {
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
    niumUpdatedAt: { type: String }
  }
});

schema.set('timestamps', true);

const Contact = mongoose.model('contacts', schema);

module.exports = Contact;
