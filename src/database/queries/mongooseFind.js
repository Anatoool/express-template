const mongoose = require('mongoose');
const userScheme = require('../schemes/userScheme');

const User = mongoose.model("User", userScheme);

const mongooseFind = async ({
  scheme = '',
  conditions = {},
}) => {

  try{

    switch (scheme) {
      case 'user':
        return await User.find(conditions);
      default:
        throw ({ error: "Invalid scheme in mongooseFind"});
    }

  } catch (err) {

    throw err;

  }

};

module.exports = mongooseFind;