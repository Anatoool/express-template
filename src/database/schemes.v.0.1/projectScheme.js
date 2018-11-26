const mongoose = require('mongoose');

const projectScheme = new mongoose.Schema({
  user_id: String,
  title: String,
  description: String,
  create_date: Date,
},
{ versionKey: false }
);

module.exports = projectScheme;