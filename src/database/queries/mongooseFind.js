const mongoose = require('mongoose');
const userScheme = require('../schemes/userScheme');
const ideaScheme = require('../schemes/ideaScheme');

const User = mongoose.model('User', userScheme);
const Idea = mongoose.model('Idea', ideaScheme);

const mongooseFind = async ({
  scheme = '',
  conditions = {},
  projection = {},
  options = {},
}) => {

  try{

    switch (scheme) {
      case 'user':
        return await User.find(conditions);
      case 'idea':
        return await Idea.find(conditions);
      default:
        throw ({ error: "Invalid scheme in mongooseFind"});
    }

  } catch (err) {

    throw err;

  }

};

module.exports = mongooseFind;