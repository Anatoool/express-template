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

}

module.exports = Validation;