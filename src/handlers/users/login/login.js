const userLoginDB = require('./login.db');

const userLogin = async (req, res) => {
  const authData = req.body;
  const { email = '' } = authData;

  const user = userLoginDB({req, res, email});
  console.log(user);

  return res.status(200).send({response: 'Success'});
};

module.exports = userLogin;