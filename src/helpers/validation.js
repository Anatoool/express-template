const validator = require('validator');

class Validation {

  static minMaxLength({ value = '', errors = {}, minLength, maxLength, fieldName }) {

    if (!value || !validator.isByteLength(value, { min: minLength, max: undefined })) {
      errors[fieldName] = {
        message: `${fieldName} should contain more than ${minLength} characters`,
      };
      errors.error = true;
      errors.message = `${errors.message} ${fieldName} should contain more than ${minLength} characters,`;
    } else if (!validator.isByteLength(value, { min: undefined, max: maxLength })) {
      errors[fieldName] = {
        message: `${fieldName} should contain no more than ${maxLength} characters`,
      };
      errors.error = true;
      errors.message = `${errors.message} ${fieldName} should contain no more than ${maxLength} characters,`;
    }
  };

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