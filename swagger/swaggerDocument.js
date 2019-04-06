const YAML = require('yamljs');

const createSwaggerDocument = () => {

  const common = YAML.load('./swagger/common.yaml');

  // definitions of models
  const authorDefinition = YAML.load('./swagger/_definitions/Author.yaml');
  const paginationDefinition = YAML.load('./swagger/_definitions/Pagination.yaml');
  const ideaDefinition = YAML.load('./swagger/_definitions/Idea.yaml');

  // user routes
  const usersRegistration = YAML.load('./swagger/users/usersRegistration.yaml');
  const usersUpdateProfile = YAML.load('./swagger/users/usersUpdateProfile.yaml');
  const usersConfirmEmail = YAML.load('./swagger/users/usersConfirmEmail.yaml');
  const usersLogin = YAML.load('./swagger/users/usersLogin.yaml');
  const usersRefreshToken = YAML.load('./swagger/users/usersRefreshToken.yaml');

  // ideas routes
  const getIdeas = YAML.load('./swagger/ideas/getIdeas.yaml');
  const getIdea = YAML.load('./swagger/ideas/getIdea.yaml');
  const createIdea = YAML.load('./swagger/ideas/createIdea.yaml');

  const swaggerDocument = {
    ...common,
    paths: {
      // users
      ...usersLogin.paths,
      ...usersRefreshToken.paths,
      ...usersConfirmEmail.paths,
      '/users': {
        ...usersRegistration.paths['/users'],
        ...usersUpdateProfile.paths['/users'],
      },
      // ideas
      '/ideas': {
        ...createIdea.paths['/ideas'],
        ...getIdeas.paths['/ideas'],
        },
      '/ideas/{ideaId}': {
        ...getIdea.paths['/ideas/{ideaId}'],
      },
    },
    definitions: {
      ...authorDefinition,
      ...paginationDefinition,
      ...ideaDefinition,
    },
  };

  return swaggerDocument;
};

module.exports = createSwaggerDocument;
