const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: String,
  confirmed: Boolean,
},
{ versionKey: false }
);

module.exports = userScheme;