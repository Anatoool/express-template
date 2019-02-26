const asyncHandler = require('express-async-handler');

const userRegistration = require('../handlers/users/registration/registration');
const userConfirmEmail = require('../handlers/users/confirm/confirm');
const userLogin = require('../handlers/users/login/login');
const userRefreshToken = require('../handlers/users/refresh-token/refreshToken');

module.exports = function(app) {

  app.post('/users', asyncHandler(userRegistration));

  app.post('/users/confirm', asyncHandler(userConfirmEmail));

  app.post('/auth/login', asyncHandler(userLogin));

  app.post('/auth/refresh', asyncHandler(userRefreshToken));

};