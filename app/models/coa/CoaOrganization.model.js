import { Schema, model } from 'mongoose';

const schema = new Schema({
  organizationId: { type: Schema.Types.ObjectId, required: true, index: true },
  coa: [{
    _id: false,
    code: { type: String, index: true, required: true },
    reportCode: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    taxCode: { type: String, required: true },
    financialStatementCaption: { type: String, required: true },
    // billCategory: { type: String, required: true },
    simplifiedName: { type: String, required: true },
    /* subAccount: [{
      _id: false,
      name: { type: String }
    }] */
    subAccount: { type: Array, default: [] }
  }],
  templateVersion: { type: String, required: true }
});

schema.set('timestamps', true);

const CoaOrganization = model('coa_organization', schema);

export default CoaOrganization;
