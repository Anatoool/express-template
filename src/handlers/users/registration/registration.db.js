const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userScheme = require('@database/schemes.v.0.1/userScheme');
const User = mongoose.model("User", userScheme);
const userSendConfirmationMail = require('@emails/registration-confirmation/registrationConfirm');

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

    await newUser.save();
    userSendConfirmationMail({email: user.email});
    return res.status(200).send({response: 'User was created'});

  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(422).send(err);
    }

    return res.status(500).send(err);
  }

};

module.exports = userRegistrationDB;