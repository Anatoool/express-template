const jwt = require('jsonwebtoken');
const usersFindOne = require('../../../database/queries/users/usersFindOne');
const usersFindByIdAndUpdate = require('../../../database/queries/users/usersFindByIdAndUpdate');
const createTokens = require('../../../helpers/createTokens');
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

  if (tokenInfo.type !== 'refresh') {
    return res.status(401).send({
      name: "JsonWebTokenError",
      message: "Invalid token type",
    });
  }

  const { id: userId = '' } = tokenInfo;

  const user = await usersFindOne({ conditions: { _id: userId } });
  const { refreshTokens = [] } = user;

  const oldRefreshTokenIndex = refreshTokens.lastIndexOf(refreshToken);

  if (oldRefreshTokenIndex === -1) {
    return res.status(401).send({
      name: "RefreshTokenError",
      message: "Unknown refresh token",
    });
  }

  const { accessToken, refreshToken: newRefreshToken, expirationDate } = createTokens(user);
  refreshTokens[oldRefreshTokenIndex] = newRefreshToken;

  await usersFindByIdAndUpdate({
    req,
    res,
    id: userId,
    update: {
      refreshTokens,
    },
  });

  res.status(200).send({
    accessToken,
    refreshToken: newRefreshToken,
    expirationDate,
  });

};

module.exports = userRefreshToken;