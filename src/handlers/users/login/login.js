const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userLoginDB = require('./login.db');
const jwtKey = require('../../../settings/config').jwtKey;

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

  const {
    _id: userId = '',
    role,
    name,
  } = user || {};

  const accessToken = jwt.sign({
    id: userId,
    role,
    name,
  }, jwtKey, { expiresIn: 60 });

  return res.status(200).send({accessToken: accessToken});
};

module.exports = userLogin;