const createIdea = require('../handlers/ideas/create/createIdea');
const getIdeas = require('../handlers/ideas/read/getIdeas');

module.exports = function(app) {

  app.get('/ideas', getIdeas);

  app.post('/ideas', createIdea);

};