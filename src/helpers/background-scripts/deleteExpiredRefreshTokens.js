const jwt = require('jsonwebtoken');
const mongooseFindByIdAndUpdate = require('../../database/queries/mongooseFindByIdAndUpdate');
const mongooseFind = require('../../database/queries/mongooseFind');
const jwtKey = require('../../settings/config').jwtKey;

const deleteExpiredRefreshTokens = async () => {
  const usersFindObject = await mongooseFind({
    scheme: 'user',
    conditions: {
      confirmed: true,
    },
  });

  const users = usersFindObject.items;

  if (!Array.isArray(users)) {
    return;
  }

  users.forEach( async (user) => {
    const { refreshTokens = [] } = user;

    const newRefreshTokens = refreshTokens.filter(refreshToken => {
      let tokenValid = true;
      try {
        jwt.verify(refreshToken, jwtKey);
      } catch (err) {
        tokenValid = false;
      }

      return tokenValid;
    });

    await mongooseFindByIdAndUpdate({
      scheme: 'user',
      id: user._id,
      update: {
        refreshTokens: newRefreshTokens,
      },
    });

  });

};

module.exports = deleteExpiredRefreshTokens;
