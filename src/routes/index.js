const ideasRoutes = require('./ideas_routes/ideas_routes');
const userRoutes = require('./user_routes');

module.exports = function(app) {
  userRoutes(app);
  ideasRoutes(app);
};