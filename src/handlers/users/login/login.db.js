const mongoose = require('mongoose');
const userScheme = require('../../../database/schemes/userScheme');

const User = mongoose.model("User", userScheme);

const userLoginDB = async ({req, res, email}) => {

  try{

    return await User.findOne({email});

  } catch (err) {

    return res.status(500).send(err);

  }

};

module.exports = userLoginDB;