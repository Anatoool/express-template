const errorTemplates = require('../_errors/errors');
const Validation = require('../../../helpers/validation');

const createIdeaValidate = async ({ idea }) => {
  const errors = {...errorTemplates.creation};
  const { title = '', description = '' } = idea;

  Validation.minMaxLength({ value: title, errors, minLength: 3, maxLength: 10, fieldName: 'title' });
  Validation.minMaxLength({ value: description, errors, minLength: 15, maxLength: 30, fieldName: 'description' });

  if (errors.error) {
    errors.message = errors.message.substring(0, errors.message.length - 1);
  }

  return errors;
};

module.exports = createIdeaValidate;