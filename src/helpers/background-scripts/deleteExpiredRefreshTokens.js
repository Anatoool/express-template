const jwt = require('jsonwebtoken');
const usersFindByIdAndUpdate = require('../../database/queries/users/usersFindByIdAndUpdate');
const usersFind = require('../../database/queries/users/usersFind');
const jwtKey = require('../../settings/config').jwtKey;

const deleteExpiredRefreshTokens = async () => {
  const users = await usersFind({
    conditions: {
      confirmed: true,
    },
  });

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

    await usersFindByIdAndUpdate({
      id: user._id,
      update: {
        refreshTokens: newRefreshTokens,
      },
    });

  });

};

module.exports = deleteExpiredRefreshTokens;
