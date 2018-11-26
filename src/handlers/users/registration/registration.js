const userRegistrationDB = require('./registration.db');

const userRegistration = (req, res) => {
  const user = req.body;

  userRegistrationDB({req, res, user});
};

module.exports = userRegistration;