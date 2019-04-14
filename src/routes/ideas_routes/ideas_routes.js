const asyncHandler = require('express-async-handler');

const getUserFromToken = require('../../helpers/auth/getUserFromToken.middleware');
const createPermissionCheck = require('./create.permission.check');

const createIdea = require('../../handlers/ideas/create/createIdea');
const getIdeas = require('../../handlers/ideas/read/getIdeas');
const getIdea = require('../../handlers/ideas/read/getIdea');

module.exports = function(api) {

  api.use('/ideas*', asyncHandler(getUserFromToken));

  api.get('/ideas', asyncHandler(getIdeas));

  api.get('/ideas/:id', asyncHandler(getIdea));

  api.post('/ideas', asyncHandler(createPermissionCheck));
  api.post('/ideas', asyncHandler(createIdea));

};