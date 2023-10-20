const mongoose = require('mongoose');

const { Schema } = mongoose;

const TransactionDateSchema = new Schema({
  requested: { type: Date, default: Date.now() },
  approved: { type: Date },
  rejected: { type: Date },
  niumCompleted: { type: Date },
  niumRejected: { type: Date },
  niumCreatedAt: { type: Date }
}, { _id: false });

const schema = new Schema({
  amount: { type: Number },
  destinationAmount: { type: Number },
  totalFee: { type: Number },
  totalAmount: { type: Number },
  paymentMethod: { type: String },
  markedUpCharge: { type: Number },
  swiftCharge: { type: Number },
  swiftChargeType: { type: String },
  niumTransactionId: { type: String, unique: true },
  niumWalletId: { type: String },
  purposeOfTransfer: { type: String },
  references: { type: String },
  currency: { type: String },
  isFeeHidden: { type: Boolean },
  fees: { type: Array, required: true, default: [] },
  contact: {
    _id: { type: Schema.Types.ObjectId },
    niumBeneficiaryId: { type: String },
    name: { type: String },
    currency: { type: String },
    bankName: { type: String },
    accountNumber: { type: String }
  },
  auditId: { type: String },
  status: {
    transaction: { type: String },
    compliance: { type: String },
    remittance: { type: String },
    settlement: { type: String },
    gro: { type: String }
  },
  requestId: { type: String },
  date: TransactionDateSchema,
  approvedBy: { type: String },
  // TODO-model replace usersId with createdBy, updatedBy, organizationId
  organizationId: {
    type: String, required: true, index: true
  },
  createdBy: { type: String, required: true },
  updatedBy: { type: String },
  transactionType: { type: String, required: true, default: 'PAYOUT' },
  sender: {
    name: { type: String },
    bankName: { type: String },
    iccSource: { type: String },
    accountNumber: { type: String }
  },
  fxRate: { type: Number },
  isFeeWaived: { type: Boolean, default: false },
  exchangeRateExpiryAt: { type: Date },
  narrative: { type: String },
  bill: {
    id: { type: Schema.Types.ObjectId },
    billNumber: { type: String },
    documentId: { type: Schema.Types.ObjectId },
    filename: { type: String },
    contactName: { type: String }
  },
  lockedCurrency: { type: String, default: 'source' },
  merchant: {
    categoryCode: { type: String },
    nameLocation: { type: String },
    currency: { type: String },
    city: { type: String }
  },
  card: {
    cardId: { type: Schema.Types.ObjectId },
    cardHashId: { type: String },
    lastDigitCardNumber: { type: String },
    cardHolderName: { type: String }
  },
  category: { type: String },
  niumAuthCode: { type: String },
  relatedTransactionId: { type: Schema.Types.ObjectId },
  relatedNiumTransactionId: { type: String },
  cardTransactionType: { type: String },
  wallet: {
    name: { type: String },
    currency: { type: String }
  },
  quoteId: { type: String }
});

schema.set('timestamps', true);

const Transaction = mongoose.model('transactions', schema);

module.exports = Transaction;
