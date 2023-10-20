const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  createdBy: { type: Schema.Types.ObjectId, required: true, index: true },
  status: {
    type: String
  },
  cardTitle: {
    type: String
  },
  monthlyLimit: {
    type: Number
  },
  organizationId: {
    type: Schema.Types.ObjectId, required: true, index: true
  },
  userId: {
    type: Schema.Types.ObjectId, required: true, index: true
  },
  theme: {
    type: String // ["DEFAULT", "BLUE", "ORANGE"]
  },
  cardHashId: {
    type: String
  },
  currency: {
    type: String
  },
  nameOnCard: {
    type: String
  },
  currentMonthlyUsage: {
    type: Number,
    default: 0
  },
  lastFourDigits: {
    type: String
  },
  expiryTime: {
    type: Date
  },
  lastTransactionAt: {
    type: Date
  },
  lastTransactionSyncAt: {
    type: Date
  }
});

schema.set('timestamps', true);

const Card = mongoose.model('cards', schema);

module.exports = Card;
