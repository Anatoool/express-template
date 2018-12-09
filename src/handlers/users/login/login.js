const bcrypt = require('bcrypt');
const userLoginDB = require('./login.db');

const userLogin = async (req, res) => {
  const authData = req.body;
  const { email = '', password = '' } = authData;

  const user = await userLoginDB({req, res, email: email});
  const { password: hashedPassword = '' } = user || {};
  const passwordIsCorrect = await bcrypt.compare(password, hashedPassword);

  if (!passwordIsCorrect || !user) {
    return res.status(403).send({
      error: true,
      _message: "User does not exist or password is wrong",
      message: "User does not exist or password is wrong",
      name: "UserLoginError",
    });
  }

  return res.status(200).send({response: 'Success'});
};

module.exports = userLogin;