import { Schema, model } from 'mongoose';

const schema = new Schema({
  name: { type: String },
  type: { type: String },
  coa: [{
    _id: false,
    code: { type: String, required: true, index: true },
    reportCode: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    // billCategory: { type: String, required: true },
    simplifiedName: { type: String, required: true },
    taxCode: { type: String, required: true },
    financialStatementCaption: { type: String, required: true }
  }],
  version: { type: Number, unique: true, required: true },
  isLive: { type: Boolean, default: false },
  liveDate: { type: Date || null, default: null }
});

schema.set('timestamps', true);

const CoaTemplate = model('coa_template', schema);

export default CoaTemplate;
