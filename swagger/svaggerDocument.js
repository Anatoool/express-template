const YAML = require('yamljs');

const createSwaggerDocument = () => {

  const common = YAML.load('./swagger/common.yaml');
  const pets = YAML.load('./swagger/pets.yaml');

  const swaggerDocument = {
    ...common,
    ...pets,
  };

  return swaggerDocument;
};

module.exports = createSwaggerDocument;
