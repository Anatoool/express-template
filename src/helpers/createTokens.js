const moment = require('moment');
const jwt = require('jsonwebtoken');
const config = require('../settings/config');

const jwtKey = config.jwtKey;

const createTokens = (user = {}) => {
  const {
    _id: userId = '',
    role,
    name,
    resource = {},
  } = user || {};

  const accessToken = jwt.sign({
    id: userId,
    role,
    name,
    resource,
    type: 'access',
  }, jwtKey, { expiresIn: config.accessTokenLifeTime });

  const refreshToken = jwt.sign({
    id: userId,
    role,
    name,
    type: 'refresh',
  }, jwtKey, { expiresIn: config.refreshTokenLifeTime });

  return ({
    accessToken,
    refreshToken,
    expirationDate: moment().add(config.accessTokenLifeTime, 'seconds').toISOString(),
  });
};

module.exports = createTokens;