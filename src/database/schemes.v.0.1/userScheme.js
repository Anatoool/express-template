const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    // lowercase: true,
    // trim: true,
    // index: true,
    // unique: true,
    // required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
    required: true,
  },
  password: String,
  role: String,
  confirmed: Boolean,
},
{ versionKey: false }
);

module.exports = userScheme;