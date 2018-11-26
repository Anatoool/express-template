const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    name: String,
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