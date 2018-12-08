const userConfirmEmailDB = require('./confirm.db');

const userConfirmEmail = (req, res) => {
  const { code = '' } = req.body;

  userConfirmEmailDB({req, res, code});
};

module.exports = userConfirmEmail;