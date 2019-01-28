const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const Schema = mongoose.Schema;

const ideaScheme = new Schema({
  user_id: String,
  title: String,
  description: String,
  create_date: Date,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
},
{ versionKey: false }
);

ideaScheme.plugin(mongoosePaginate);

module.exports = ideaScheme;