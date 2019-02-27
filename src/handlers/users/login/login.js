const moment = require('moment');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usersFindOne = require('../../../database/queries/users/usersFindOne');
const usersFindByIdAndUpdate = require('../../../database/queries/users/usersFindByIdAndUpdate');
const jwtKey = require('../../../settings/config').jwtKey;

const userLogin = async (req, res) => {
  const authData = req.body;
  const { email = '', password = '' } = authData;

  const conditions = { email };

  const user = await usersFindOne({ conditions });

  const {
    password: hashedPassword = '',
    confirmed = false,
    refreshTokens = [],
  } = user || {};
  const passwordIsCorrect = await bcrypt.compare(password, hashedPassword);

  if (!passwordIsCorrect || !user) {
    return res.status(401).send({
      error: true,
      _message: "User does not exist or password is wrong",
      message: "User does not exist or password is wrong",
      name: "UserLoginError",
    });
  } else if (!confirmed) {
    return res.status(401).send({
      error: true,
      _message: "Email is not confirmed",
      message: "Email is not confirmed",
      name: "UserLoginError",
    });
  }

  const {
    _id: userId = '',
    role,
    name,
    resource = {},
  } = user || {};

  const accessLifeTime = 300; // 60 seconds * 5

  const accessToken = jwt.sign({
    id: userId,
    role,
    name,
    resource,
    type: 'access',
  }, jwtKey, { expiresIn: accessLifeTime });

  const refreshToken = jwt.sign({
    id: userId,
    role,
    name,
    type: 'refresh',
  }, jwtKey, { expiresIn: "2 days" });

  refreshTokens.push(refreshToken);
  if (refreshTokens.length > 5) {
    refreshTokens.shift();
  }

  await usersFindByIdAndUpdate({
    req,
    res,
    id: userId,
    update: {
      refreshTokens,
    },
  });

  return res.status(200).send({
    accessToken,
    refreshToken,
    expirationDate: moment().add(accessLifeTime, 'seconds').toISOString(),
  });
};

module.exports = userLogin;