const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  category: { type: String },
  code: { type: String, unique: true },
  description: { type: String },
  isActive: { type: Boolean },
  value: { type: Object },
  createdBy: { type: String },
  updatedBy: { type: String }
});

schema.set('timestamps', true);

schema.set('writeConcern', {
  w: 'majority',
  j: true,
  wtimeout: 1000
});

const SystemVariable = mongoose.model('system_variables', schema);

module.exports = SystemVariable;
