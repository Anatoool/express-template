const mongoose = require('mongoose');
const userScheme = require('../../schemes/userScheme');

const User = mongoose.model("User", userScheme);

const usersFind = async ({
  conditions = {},
}) => {

  try{

    return await User.find(conditions);

  } catch (err) {

    throw err;

  }

};

module.exports = usersFind;