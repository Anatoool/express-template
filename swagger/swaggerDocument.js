const YAML = require('yamljs');

const createSwaggerDocument = () => {

  const common = YAML.load('./swagger/common.yaml');

  // definitions of models
  const ideaDefinition = YAML.load('./swagger/_definitions/Idea.yaml');
  const paginationDefinition = YAML.load('./swagger/_definitions/Pagination.yaml');

  // user routes
  const usersRegistration = YAML.load('./swagger/users/usersRegistration.yaml');
  const usersConfirmEmail = YAML.load('./swagger/users/usersConfirmEmail.yaml');
  const usersLogin = YAML.load('./swagger/users/usersLogin.yaml');
  const usersRefreshToken = YAML.load('./swagger/users/usersRefreshToken.yaml');

  // ideas routes
  const getIdeas = YAML.load('./swagger/ideas/getIdeas.yaml');
  const createIdea = YAML.load('./swagger/ideas/createIdea.yaml');

  const swaggerDocument = {
    ...common,
    paths: {
      // users
      ...usersRegistration.paths,
      ...usersConfirmEmail.paths,
      ...usersLogin.paths,
      ...usersRefreshToken.paths,
      // ideas
      '/ideas': {
        ...getIdeas.paths['/ideas'],
        ...createIdea.paths['/ideas'],
        },
    },
    definitions: {
      ...ideaDefinition,
      ...paginationDefinition,
    },
  };

  return swaggerDocument;
};

module.exports = createSwaggerDocument;
