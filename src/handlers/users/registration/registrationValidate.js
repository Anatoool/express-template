const templates = require('../_errors/errors');
const Validation = reqlib('src/helpers/validation');
const mongoose = require('mongoose');
const userScheme = reqlib('/src/database/schemes.v.0.1/userScheme');
const User = mongoose.model("User", userScheme);

const userRegistrationValidate = async ({user, res}) => {
  const errors = templates.registration;
  const { email = '', password = '' } = user;

  Validation.email({email, isRequired: true, errors});
  Validation.password({password, errors});

  if (!errors.email){
    try{
      let users;
      users = await User.find({ email });
      if (users.length) {
        errors.email = {
          message: "Email already in use",
        };
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