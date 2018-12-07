const userRegistration = reqlib('src/handlers/users/registration/registration');
const userConfirmEmail = reqlib('/src/handlers/users/confirm/confirm');

module.exports = function(app) {
  app.post('/users', userRegistration);
  app.post('/users/confirm', userConfirmEmail);
};