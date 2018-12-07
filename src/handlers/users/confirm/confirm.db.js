const mongoose = require('mongoose');
const userScheme = reqlib('/src/database/schemes.v.0.1/userScheme');
const User = mongoose.model("User", userScheme);

const userConfirmEmailDB = async ({req, res, user}) => {

  try{


  } catch (err) {

  }

};

module.exports = userConfirmEmailDB;