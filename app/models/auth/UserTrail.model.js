const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  emailAddress: { type: String },
  phoneNumber: { type: String },
  sessionId: { type: String },
  loginAt: { type: Date },
  logoutAt: { type: Date }
});

schema.set('timestamps', true);

const UserTrail = mongoose.model('user_trails', schema);

module.exports = UserTrail;
