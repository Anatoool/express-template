const mongoose = require('mongoose');
const userScheme = require('../../schemes/userScheme');

const User = mongoose.model("User", userScheme);

const usersFindByIdAndUpdate = async ({
  id,
  update = {},
}) => {

  try{

    return await User.findByIdAndUpdate(id, update);

  } catch (err) {

    throw err;

  }

};

module.exports = usersFindByIdAndUpdate;