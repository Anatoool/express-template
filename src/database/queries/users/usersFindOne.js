const mongoose = require('mongoose');
const userScheme = require('../../schemes/userScheme');

const User = mongoose.model("User", userScheme);

const usersFindOne = async ({
  conditions = {},
}) => {

  try{

    return await User.findOne(conditions);

  } catch (err) {

    throw err;

  }

};

module.exports = usersFindOne;