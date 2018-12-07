const userRegistrationValidate = require('./registrationValidate');
const userRegistrationDB = require('./registration.db');

const userRegistration = async (req, res) => {
  const user = req.body;

  const errors = userRegistrationValidate(user);

  console.log(errors);

  if (errors.error) {
    return res.status(422).send({...errors});
  }

  userRegistrationDB({req, res, user});
};

module.exports = userRegistration;