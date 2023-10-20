const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  // createdBy: { type: String, required: true },
  transactionId: {
    type: Schema.Types.ObjectId, required: true, index: true
  },
  status: {
    type: String,
    default: 'PENDING' // ["PENDING", "SUCCESS", "FAILED"]
  },
  amount: {
    type: Number,
    required: true
  },
  niumWalletId: {
    type: String,
    required: true
  },
  niumCustomerHashId: {
    type: String,
    required: true
  },
  processedAt: {
    type: Date,
    default: null
  },
  systemReferenceNumber: {
    type: String
  },
  niumResponse: {
    type: String
  },
  attempt: {
    type: Number
  },
  createdBy: {
    type: String
  }
});

schema.set('timestamps', true);

const WaiveFeeTransaction = mongoose.model('waive_fee_transactions', schema);

module.exports = WaiveFeeTransaction;
