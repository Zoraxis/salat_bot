const { Schema, model } = require('mongoose');

const autoRoleSchema = new Schema({
  guildId: {
    type: String,
    required: true
  },
  roleId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true,
  }
});

module.exports = model('AutoRole', autoRoleSchema);