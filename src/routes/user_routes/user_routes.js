const asyncHandler = require('express-async-handler');

const userRegistration = require('../../handlers/users/registration/registration');
const userConfirmEmail = require('../../handlers/users/confirm/confirm');
const userLogin = require('../../handlers/users/login/login');
const userRefreshToken = require('../../handlers/users/refresh-token/refreshToken');
const userUpdateProfile = require('../../handlers/users/update-profile/updateProfile');

module.exports = function(app) {

  app.post('/users', asyncHandler(userRegistration));

  app.put('/users', asyncHandler(userUpdateProfile));

  app.post('/users/confirm', asyncHandler(userConfirmEmail));

  app.post('/users/login', asyncHandler(userLogin));

  app.post('/users/refresh', asyncHandler(userRefreshToken));

};