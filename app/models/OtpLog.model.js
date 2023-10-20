import { Schema, model } from 'mongoose';

const schema = new Schema({
  sid: { type: String },
  module: { type: String },
  data: Schema.Types.Mixed
});
schema.set('timestamps', true);

const OtpLog = model('otp_logs', schema);

export const SaveOrUpdateOtpLog = (sid, module, data) => {
  OtpLog.findOne({ sid }).then((result) => {
    if (!result) {
      OtpLog.create({ sid, module, data: JSON.parse(JSON.stringify(data)) });
    }
    else {
      OtpLog.updateOne({ _id: result._id },
        { data: JSON.parse(JSON.stringify(data)) }).exec();
    }
  });
};

export default OtpLog;
