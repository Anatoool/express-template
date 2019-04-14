const ideasRoutes = require('./ideas_routes/ideas_routes');
const userRoutes = require('./user_routes/user_routes');

module.exports = function(api) {
  userRoutes(api);
  ideasRoutes(api);
};