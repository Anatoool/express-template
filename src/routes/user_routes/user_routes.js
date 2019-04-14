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

module.exports = function(api) {

  api.post('/users', asyncHandler(userRegistration));

  api.put('/users', asyncHandler(getUserFromToken));
  api.put('/users', asyncHandler(updateProfilePermissionCheck));
  api.put('/users', asyncHandler(userUpdateProfile));

  api.post('/users/confirm', asyncHandler(userConfirmEmail));

  api.post('/users/login', asyncHandler(userLogin));

  api.post('/users/refresh', asyncHandler(userRefreshToken));

};