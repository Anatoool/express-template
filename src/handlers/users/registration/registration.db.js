const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userScheme = require('@database/schemes.v.0.1/userScheme');
const User = mongoose.model("User", userScheme);

const userRegistrationDB = async ({req, res, user}) => {

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const newUser = new User({
    name: user.name,
    email: user.email,
    role: 'user',
    confirmed: false,
    password: hashedPassword,
  });

  try{

    let saveRes = await newUser.save();
    console.log(saveRes);
    return res.status(200).send({response: 'User was created'});

  } catch (err){

    console.log(err);

    if (err.name === 'MongoError' && err.code === 11000) {
      return res.status(409).send(err);
    }

    return res.status(500).send(err);
  }

};

module.exports = userRegistrationDB;