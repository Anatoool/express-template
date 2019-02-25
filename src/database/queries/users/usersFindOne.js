const mongoose = require('mongoose');
const userScheme = require('../../schemes/userScheme');

const User = mongoose.model("User", userScheme);

const usersFindOne = async ({
  req,
  res,
  conditions = {},
}) => {

  try{

    return await User.findOne(conditions);

  } catch (err) {

    return res.status(500).send(err);

  }

};

module.exports = usersFindOne;