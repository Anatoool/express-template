const asyncHandler = require('express-async-handler');
const getUserFromToken = require('../../helpers/auth/getUserFromToken.middleware');

// handlers
const userRegistration = require('../../handlers/users/registration/registration');
const userConfirmEmail = require('../../handlers/users/confirm/confirm');
const userLogin = require('../../handlers/users/login/login');
const userRefreshToken = require('../../handlers/users/refresh-token/refreshToken');
const userUpdateProfile = require('../../handlers/users/update-profile/updateProfile');

// permission check
const updateProfilePermissionCheck = require('./update-profile.permission.check');

module.exports = function(app) {

  app.post('/users', asyncHandler(userRegistration));

  app.put('/users', asyncHandler(getUserFromToken));
  app.put('/users', asyncHandler(updateProfilePermissionCheck));
  app.put('/users', asyncHandler(userUpdateProfile));

  app.post('/users/confirm', asyncHandler(userConfirmEmail));

  app.post('/users/login', asyncHandler(userLogin));

  app.post('/users/refresh', asyncHandler(userRefreshToken));

};