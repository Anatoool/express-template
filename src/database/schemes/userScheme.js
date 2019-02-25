const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    unique: true,
  },
  password:  {
    type: String,
    required: true,
    trim: true,
  },
  refreshTokens: {
    type: Array,
    default: [],
  },
  role: String,
  confirmed: Boolean,
  confirmCode: String,
},
{
  versionKey: false,
  timestamps: true,
}
);

module.exports = userScheme;