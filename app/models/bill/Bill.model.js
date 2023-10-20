const mongoose = require('mongoose');

const { Schema } = mongoose;

const ItemSchema = new Schema({
  description: {
    type: String
  },
  qty: {
    type: Number
  },
  unitPrice: {
    type: Number
  },
  total: {
    type: Number
  }
}, { _id: false });

const schema = new Schema({
  documentId: {
    type: Schema.Types.ObjectId
  },
  filename: {
    type: String,
    required: true
  },
  bluesheetsId: {
    type: String,
    required: true
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  needAction: {
    type: String
  },
  dueDate: {
    type: Date
  },
  contactId: {
    type: Schema.Types.ObjectId
  },
  purposeOfExpense: {
    type: String
  },
  totalAmount: {
    type: Number
  },
  taxAmount: {
    type: Number
  },
  // the actual amount with formula total - tax
  netAmount: {
    type: Number
  },
  unpaidAmount: {
    type: Number
  },
  billNumber: {
    type: String
  },
  billDate: {
    type: Date
  },
  approvedBy: {
    type: Schema.Types.ObjectId
  },
  approvedAt: {
    type: Date
  },
  paidAt: {
    type: Date
  },
  paidBy: {
    type: Schema.Types.ObjectId
  },
  billCurrency: {
    type: String
  },
  // SHA256 checksum file
  checksum: {
    type: String
  },
  items: {
    type: [ItemSchema]
  },
  // TODO-question what should this means?
  ocrResult: Schema.Types.Mixed,
  // TODO-question what should this means?
  finalBill: Schema.Types.Mixed,

  // TODO-model replace usersId with createdBy, updatedBy, organizationId
  createdBy: { type: String, required: true },
  updatedBy: { type: String },
  organizationId: {
    type: String, required: true, index: true
  },
  transactionId: {
    type: Schema.Types.ObjectId
  },
  emailBillRecipient: {
    type: String
  },
  emailBillSender: {
    type: String
  }
});

schema.set('timestamps', true);

const Bill = mongoose.model('bills', schema);

module.exports = Bill;
