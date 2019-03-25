const mongoose = require('mongoose');

const errorTemplates = require('../_errors/errors');
const Validation = require('../../../helpers/validation');
const userScheme = require('../../../database/schemes/userScheme');

const User = mongoose.model("User", userScheme);

const userRegistrationValidate = async ({user, res}) => {
  const errors = {...errorTemplates.registration};
  const { email = '', password = '' } = user;

  Validation.email({email, isRequired: true, errors});
  Validation.password({password, errors});

  if (!errors.messages.email){
    try{
      let users;
      users = await User.find({ email });
      if (users.length) {
        errors.messages.email = "Email already in use";
        errors.error = true;
        errors.message = `${errors.message} email already in use,`;
      }

    } catch (err) {
      return res.status(500).send(err);
    }
  }

  if (errors.error) {
    errors.message = errors.message.substring(0, errors.message.length - 1);
  }

  return errors;
};

module.exports = userRegistrationValidate;