const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userScheme = require('../../../database/schemes/userScheme');
const userSendConfirmationMail = require('../../../emails/registration-confirmation/registrationConfirm');

const User = mongoose.model("User", userScheme);

const userRegistrationDB = async ({req, res, user}) => {

  const hashedPassword = await bcrypt.hash(user.password, 10);
  const confirmCode =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  const newUser = new User({
    name: user.name,
    email: user.email,
    role: 'user',
    confirmed: false,
    password: hashedPassword,
    confirmCode,
  });

  try{

    await newUser.save();
    userSendConfirmationMail({ email: user.email, confirmCode });
    return res.status(200).send({response: 'User was created'});

  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(422).send(err);
    }

    return res.status(500).send(err);
  }

};

module.exports = userRegistrationDB;