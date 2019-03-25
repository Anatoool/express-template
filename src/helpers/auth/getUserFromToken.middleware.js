const jwt = require('jsonwebtoken');
const jwtKey = require('../../settings/config').jwtKey;

const getUserFromToken = async (req, res, next) => {
  const token = req.get('Authorization') || '';

  try {
    const tokenInfo = jwt.verify(token, jwtKey);
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