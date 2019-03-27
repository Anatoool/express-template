const jwt = require('jsonwebtoken');
const jwtKey = require('../../settings/config').jwtKey;

const getUserFromToken = async (req, res, next) => {
  const token = req.get('Authorization') || '';

  let user = { role: 'guest' };
  if (!token) {
    req.user = user;
    return next();
  }

  try {
    const tokenInfo = jwt.verify(token, jwtKey);

    if (tokenInfo.type !== 'access') {
      return res.status(401).send({
        name: "JsonWebTokenError",
        message: "Invalid token type",
        error: true,
      });
    }

    req.user = tokenInfo;
  } catch (err) {

    if (
      err.name === 'TokenExpiredError' ||
      err.name === 'JsonWebTokenError'
    ) {
      return res.status(401).send(err);
    }

    throw err;
  }

  next();
};

module.exports = getUserFromToken;