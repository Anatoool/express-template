const mongoose = require('mongoose');
const userScheme = require('../schemes/userScheme');

const User = mongoose.model("User", userScheme);

const mongooseFindOne = async ({
  scheme = '',
  conditions = {},
}) => {

  try{

    switch (scheme) {
      case 'user':
        return await User.find(conditions);
      default:
        throw ({ error: "Invalid scheme in mongooseFindOne"});
    }

    return await User.findOne(conditions);

  } catch (err) {

    throw err;

  }

};

module.exports = mongooseFindOne;