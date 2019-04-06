const asyncHandler = require('express-async-handler');

const getUserFromToken = require('../../helpers/auth/getUserFromToken.middleware');
const createPermissionCheck = require('./create.permission.check');

const createIdea = require('../../handlers/ideas/create/createIdea');
const getIdeas = require('../../handlers/ideas/read/getIdeas');
const getIdea = require('../../handlers/ideas/read/getIdea');

module.exports = function(app) {

  app.use('/ideas*', asyncHandler(getUserFromToken));

  app.get('/ideas', asyncHandler(getIdeas));

  app.get('/ideas/:id', asyncHandler(getIdea));

  app.post('/ideas', asyncHandler(createPermissionCheck));
  app.post('/ideas', asyncHandler(createIdea));

};