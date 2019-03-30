const mongoose = require('mongoose');
const userScheme = require('../schemes/userScheme');
const ideaScheme = require('../schemes/ideaScheme');

const User = mongoose.model("User", userScheme);
const Idea = mongoose.model('Idea', ideaScheme);

const mongooseFindById = async ({
  id = '',
  scheme = '',
  projection = null, // return fields
  options = {}, // options of query
 }) => {

  let resultObject = {};

  try{

    switch (scheme) {
      case 'user':
        resultObject = await User.findById(id, projection, options);
        break;
      case 'idea':
        resultObject = await Idea.findById(id, projection, options);
        break;
      default:
        throw ({ error: "Invalid scheme in mongooseFindOne"});
    }

    return resultObject;

  } catch (err) {

    throw err;

  }

};

module.exports = mongooseFindById;