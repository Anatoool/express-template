const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'can\'t be blank'],
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, 'can\'t be blank'],
    unique: true,
  },
  password:  {
    type: String,
    required: true,
    trim: true,
  },
  role: String,
  confirmed: Boolean,
},
{
  versionKey: false,
  timestamps: true,
}
);

userScheme.plugin(uniqueValidator, {message: 'is already taken.'});

module.exports = userScheme;