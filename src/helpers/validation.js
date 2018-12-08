const validator = require('validator');

class Validation {

  static email({ email = '', isRequired = true, errors = {} }) {
    if (!email && !isRequired) {
      return;
    }

    if (!validator.isEmail(email)) {
      errors.email = {
        message: "Invalid email format",
      };
      errors.error = true;
      errors.message = `${errors.message} invalid email format,`;
    }
  };

  static password({ password = '', errors = {} }) {
    if (!password || !validator.isByteLength(password, { min: 6, max: undefined })) {
      errors.password = {
        message: "Password should contain more than 5 characters",
      };
      errors.error = true;
      errors.message = `${errors.message} password should contain more than 5 characters,`;
    }
  }

}

module.exports = Validation;