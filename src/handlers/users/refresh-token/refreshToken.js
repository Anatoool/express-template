const moment = require('moment');
const jwt = require('jsonwebtoken');
const usersFindOne = require('../../../database/queries/users/usersFindOne');
const usersFindByIdAndUpdate = require('../../../database/queries/users/usersFindByIdAndUpdate');
const jwtKey = require('../../../settings/config').jwtKey;

const userRefreshToken = async (req, res) => {

  const { refreshToken = '' } = req.body;

  let tokenInfo = {};
  try {
    tokenInfo = jwt.verify(refreshToken, jwtKey);
  } catch (err) {

    if (
      err.name === 'TokenExpiredError' ||
      err.name === 'JsonWebTokenError'
    ) {
      return res.status(401).send(err);
    }

    throw err;
  }

  if (tokenInfo.)

  {
    "name": "JsonWebTokenError",
    "message": "invalid signature"
  }


  res.status(200).send(tokenInfo);

};

module.exports = userRefreshToken;