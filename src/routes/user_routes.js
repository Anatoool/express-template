const userRegistration = require('../handlers/users/registration/registration');

module.exports = function(app) {
    app.post('/users', userRegistration);
};