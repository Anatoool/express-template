const errorTemplates = require('../_errors/errors');
const Validation = require('../../../helpers/validation');

const updateProfileValidate = async ({ userUpdateInfo }) => {
  const errors = {...errorTemplates.updateProfile};
  const { name = '' } = userUpdateInfo;

  Validation.minMaxLength({ value: name, errors, minLength: 3, maxLength: 15, fieldName: 'name' });

  if (errors.error) {
    errors.message = errors.message.substring(0, errors.message.length - 1);
  }

  return errors;
};

module.exports = updateProfileValidate;