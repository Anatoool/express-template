const userRegistration = require('../handlers/users/registration/registration');
const userConfirmEmail = require('../handlers/users/confirm/confirm');
const userLogin = require('../handlers/users/login/login');

module.exports = function(app) {
  app.post('/users', userRegistration);
  app.post('/users/confirm', userConfirmEmail);
  app.post('/auth/login', userLogin);
};