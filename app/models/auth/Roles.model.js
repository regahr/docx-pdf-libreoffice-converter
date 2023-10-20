const mongoose = require('mongoose');

const { Schema } = mongoose;

const PermissionSchema = new Schema({
  name: { type: String },
  code: { type: String },
  value: { type: String }
},
{
  _id: false,
  timestamps: false
});

const schema = new Schema({
  roleName: { type: String },
  description: { type: String },
  permissions: [PermissionSchema]
});

schema.set('timestamps', true);

const Roles = mongoose.model('roles', schema);

module.exports = Roles;
