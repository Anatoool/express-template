const asyncHandler = require('express-async-handler');

const getUserFromToken = require('../../helpers/auth/getUserFromToken.middleware');
const createPermissionCheck = require('./create.permission.check');

const createIdea = require('../../handlers/ideas/create/createIdea');
const getIdeas = require('../../handlers/ideas/read/getIdeas');

module.exports = function(app) {

  app.use('/ideas*', asyncHandler(getUserFromToken));

  app.get('/ideas', asyncHandler(getIdeas));

  app.post('/ideas', asyncHandler(( req, res, next ) => createPermissionCheck({ req, res, next })));
  app.post('/ideas', asyncHandler(createIdea));

};