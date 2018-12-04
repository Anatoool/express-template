const userRegistrationDB = require('./registration.db');
const validator = require('validator');
const userErrorTemplate = require('@errors/userValidationError');

const userRegistration = async (req, res) => {
  const user = req.body;
  const errors = userErrorTemplate;

  console.log(user);

  if (!user.email || !validator.isEmail(user.email)) {
    errors.email = {
      message: "Invalid email format",
    };
    errors.error = true;
    errors.message = `${errors.message} invalid email format,`;
  }

  if (!user.password || !validator.isByteLength(user.password, { min: 6, max: undefined })) {
    errors.password = {
      message: "Password should contain more than 5 characters",
    };
    errors.error = true;
    errors.message = `${errors.message} password should contain more than 5 characters,`;
  }

  if (errors.error) {
    errors.message = errors.message.substring(0, errors.message.length - 1);
    return res.status(422).send({...errors});
  }

  userRegistrationDB({req, res, user});
};

module.exports = userRegistration;