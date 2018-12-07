const userConfirmEmailDB = require('./confirm.db');

const userRegistration = async (req, res) => {
  const { code = '' } = req.body;

   console.log(code);
  userConfirmEmailDB({req, res, user});
};

module.exports = userRegistration;