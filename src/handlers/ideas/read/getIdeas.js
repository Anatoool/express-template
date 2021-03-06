const ideaPopulations = require('../populations');
const mongooseFind = require('../../../database/queries/mongooseFind');

const getIdeas = async (req, res) => {
  const { query = {}, user = {} } = req;

  let ideasFindObject;

  switch (user.role) {
    case 'user':
    case 'guest':
    default:
      ideasFindObject = await mongooseFind({
        scheme: 'idea',
        pagination: { page: query.page, pageSize: query.pageSize },
        options: {
          populate: [ideaPopulations.author]
        }
      });
  }

  return res.status(200).send(ideasFindObject);

};

module.exports = getIdeas;