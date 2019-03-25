const jwt = require('jsonwebtoken');
const mongooseFindOne = require('../../../database/queries/mongooseFindOne');
const mongooseFindByIdAndUpdate = require('../../../database/queries/mongooseFindByIdAndUpdate');
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
      err.error = true;
      return res.status(401).send(err);
    }

    throw err;
  }

  if (tokenInfo.type !== 'refresh') {
    return res.status(401).send({
      name: "JsonWebTokenError",
      message: "Invalid token type",
      error: true,
    });
  }

  const { id: userId = '' } = tokenInfo;

  const user = await mongooseFindOne({ scheme: 'user', conditions: { _id: userId } });
  const { refreshTokens = [] } = user;

  const oldRefreshTokenIndex = refreshTokens.lastIndexOf(refreshToken);

  if (oldRefreshTokenIndex === -1) {
    return res.status(401).send({
      name: "RefreshTokenError",
      message: "Unknown refresh token",
      error: true,
    });
  }

  const { accessToken, refreshToken: newRefreshToken, expirationDate } = createTokens(user);
  refreshTokens[oldRefreshTokenIndex] = newRefreshToken;

  await mongooseFindByIdAndUpdate({
    scheme: 'user',
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