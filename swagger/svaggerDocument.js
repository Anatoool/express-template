const YAML = require('yamljs');

const createSwaggerDocument = () => {

  const common = YAML.load('./swagger/common.yaml');

  // user routes
  const usersRegistration = YAML.load('./swagger/users/usersRegistration.yaml');
  const usersConfirmEmail = YAML.load('./swagger/users/usersConfirmEmail.yaml');
  const usersLogin = YAML.load('./swagger/users/usersLogin.yaml');
  const usersRefreshToken = YAML.load('./swagger/users/usersRefreshToken.yaml');

  // ideas routes
  const getIdeas = YAML.load('./swagger/ideas/getIdeas.yaml');

  const swaggerDocument = {
    ...common,
    paths: {
      // users
      ...usersRegistration.paths,
      ...usersConfirmEmail.paths,
      ...usersLogin.paths,
      ...usersRefreshToken.paths,
      // ideas
      ...getIdeas.paths,
    },
  };

  return swaggerDocument;
};

module.exports = createSwaggerDocument;
