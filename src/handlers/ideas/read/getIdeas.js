const mongooseFind = require('../../../database/queries/mongooseFind');

const getIdeas = async (req, res) => {
  const { user = {} } = req;

  let ideas;
  switch (user.role) {
    case 'user':
    case 'guest':
    default:
      ideas = await mongooseFind({ scheme: 'idea' });
  }

  return res.status(200).send(ideas);

};

module.exports = getIdeas;