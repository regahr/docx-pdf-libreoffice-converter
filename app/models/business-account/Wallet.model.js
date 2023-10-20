const mongoose = require('mongoose');

const { Schema } = mongoose;

const virtualAccountDetails = new Schema({
  currencyCode: { type: String },
  accountName: { type: String },
  accountType: { type: String },
  accountNumber: { type: String },
  bankName: { type: String },
  fullBankName: { type: String },
  bankAddress: { type: String },
  routingCodeType1: { type: String },
  routingCodeValue1: { type: String },
  routingCodeType2: { type: String },
  routingCodeValue2: { type: String },
  accountNameMPES: { type: String },
  bankCode: { type: String },
  branchCode: { type: String },
  isVanLocked: { type: Boolean, default: true }
}, { _id: false });

const schema = new Schema({
  niumWalletId: { type: String, default: 0 },
  balance: { type: Number, default: 0 },
  holdingBalance: { type: Number, default: 0 },
  currency: { type: String },
  default: { type: Boolean, default: false },
  virtualAccounts: new Schema({
    local: virtualAccountDetails,
    global: virtualAccountDetails,
    overseas: virtualAccountDetails
  }, { _id: false }),

  // TODO-model replace usersId with createdBy, updatedBy, organizationId
  createdBy: { type: String, required: true },
  updatedBy: { type: String },
  organizationId: {
    type: String, required: true, index: true
  }
});

schema.set('timestamps', true);

const Wallet = mongoose.model('wallets', schema);

module.exports = Wallet;
