const userRegistrationDB = require('./registration.db');
const validator = require('validator');

const userRegistration = (req, res) => {
  const user = req.body;
  const errors = [];

  if (!validator.isEmail(user.email)) {
    errors.push({field: 'email', message: 'Email are not valid!'});
  }

  if (!validator.isByteLength(user.password, { min: 6, max: undefined })) {
    errors.push({field: 'password', message: 'Password should contain more than 5 characters!'});
  }

  if (errors.length) {
    return res.status(422).send({error: true, errors});
  }

  userRegistrationDB({req, res, user});
};

module.exports = userRegistration;