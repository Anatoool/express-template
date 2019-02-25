const mongoose = require('mongoose');
const userScheme = require('../../schemes/userScheme');

const User = mongoose.model("User", userScheme);

const usersFindByIdAndUpdate = async ({
  req,
  res,
  id,
  update = {},
}) => {

  try{

    return await User.findByIdAndUpdate(id, update);

  } catch (err) {

    return res.status(500).send(err);

  }

};

module.exports = usersFindByIdAndUpdate;