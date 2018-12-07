const templates = require('../_errors/errors');
const Validation = reqlib('src/helpers/validation');

const userRegistrationValidate = (user = {}) => {
  const errors = templates.registration;
  const { email = '', password = '' } = user;

  Validation.email({email, isRequired: true, errors});

  // if (!password || !validator.isByteLength(password, { min: 6, max: undefined })) {
  //   errors.password = {
  //     message: "Password should contain more than 5 characters",
  //   };
  //   errors.error = true;
  //   errors.message = `${errors.message} password should contain more than 5 characters,`;
  // }

  if (errors.error) {
    errors.message = errors.message.substring(0, errors.message.length - 1);
  }

  return errors;
};

module.exports = userRegistrationValidate;