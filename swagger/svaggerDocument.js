const YAML = require('yamljs');

const createSwaggerDocument = () => {

  const common = YAML.load('./swagger/common.yaml');
  const users = YAML.load('./swagger/users.yaml');

  const swaggerDocument = {
    ...common,
    paths: {
      ...users.paths,
    },
  };

  return swaggerDocument;
};

module.exports = createSwaggerDocument;
