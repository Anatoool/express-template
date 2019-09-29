const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userScheme = require('../../../database/schemes/userScheme');
const userSendConfirmationMail = require('../../../emails/registration-confirmation/registrationConfirm');
const userRegistrationValidate = require('./registrationValidate');

const User = mongoose.model("User", userScheme);

const userRegistration = async (req, res) => {
  const user = req.body;

  const errors = await userRegistrationValidate({user, req, res});

  if (errors.error) {
    return res.status(422).send({...errors});
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(user.password, salt);

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

  await newUser.save();
  userSendConfirmationMail({ email: user.email, confirmCode });
  return res.status(200).send({response: 'User was created'});
};

module.exports = userRegistration;