import mongoose from 'mongoose';
import envConfig from '../configs/env.config';

const { Schema } = mongoose;

const schema = new Schema({
  value: { type: Schema.Types.Mixed },
  key: { type: String },
  created_at: { type: Date, default: Date.now }
});

schema.index({ created_at: 1 }, { expireAfterSeconds: envConfig.util.cacheTTL });
schema.index({ key: 1 }, { unique: true });

const TemporaryDataCache = mongoose.model('temporary_data_cache', schema);

export default TemporaryDataCache;
