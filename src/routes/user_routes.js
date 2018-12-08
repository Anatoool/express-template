const userRegistration = reqlib('src/handlers/users/registration/registration');
const userConfirmEmail = reqlib('/src/handlers/users/confirm/confirm');
const userLogin = reqlib('/src/handlers/users/login/login');

module.exports = function(app) {
  app.post('/users', userRegistration);
  app.post('/users/confirm', userConfirmEmail);
  app.post('/auth/login', userLogin);
};