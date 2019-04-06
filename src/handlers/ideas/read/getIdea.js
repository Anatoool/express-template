const ideaPopulations = require('../populations');
const mongooseFindById = require('../../../database/queries/mongooseFindById');
const errorTemplates = require('../_errors/errors');

const getIdeas = async (req, res) => {
  const { user = {} } = req;
  const { id = '' } = req.params;

  let ideaFindObject;

  switch (user.role) {
    case 'user':
    case 'guest':
    default:
      ideaFindObject = await mongooseFindById({
        id,
        scheme: 'idea',
        options: {
          populate: [ideaPopulations.author]
        }
      });
  }

  if (ideaFindObject === null) {
    const ideaNotFoundError = {
      ...errorTemplates.getIdea,
    };
    return res.status(404).send(ideaNotFoundError);
  }

  return res.status(200).send({ idea: ideaFindObject });

};

module.exports = getIdeas;