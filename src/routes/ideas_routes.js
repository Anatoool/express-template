const asyncHandler = require('express-async-handler');

const createIdea = require('../handlers/ideas/create/createIdea');
const getIdeas = require('../handlers/ideas/read/getIdeas');

module.exports = function(app) {

  app.get('/ideas', asyncHandler(getIdeas));

  app.post('/ideas', asyncHandler(createIdea));

};