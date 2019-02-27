const bcrypt = require('bcrypt');
const usersFindOne = require('../../../database/queries/users/usersFindOne');
const usersFindByIdAndUpdate = require('../../../database/queries/users/usersFindByIdAndUpdate');
const createTokens = require('../../../helpers/createTokens');

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

  const { _id: userId } = user;

  const { accessToken, refreshToken, expirationDate } = createTokens(user);

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
    expirationDate,
  });
};

module.exports = userLogin;