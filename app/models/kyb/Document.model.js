import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  fileName: {
    type: String,
    required: false
  },
  s3FileID: {
    type: String,
    required: false
  },
  organizationId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  fileType: {
    type: String
  },
  fileSize: {
    type: Number
  },
  // -- Stakeholder Data
  documentNumber: {
    type: String
  },
  documentExpiryDate: {
    type: String
  },
  documentIssuanceCountry: {
    type: String
  }
});

schema.set('timestamps', true);

const Document = model('documents', schema);

export default Document;
