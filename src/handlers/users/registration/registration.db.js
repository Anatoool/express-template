const mongoose = require('mongoose');
const userScheme = require('@database/schemes.v.0.1/userScheme');
const User = mongoose.model("User", userScheme);

const userRegistrationDB = ({req, res, user}) => {

  console.log(user);

};

module.exports = userRegistrationDB;