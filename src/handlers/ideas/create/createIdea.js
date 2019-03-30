const mongoose = require('mongoose');
const createIdeaValidate = require('./createIdeaValidate');
const ideaScheme = require('../../../database/schemes/ideaScheme');
const mongooseFindById = require('../../../database/queries/mongooseFindById');
const ideaPopulations = require('../populations');

const Idea = mongoose.model('Idea', ideaScheme);

const createIdea = async (req, res) => {
  const { user = {}, body: idea = {} } = req;

  const errors = await createIdeaValidate({ idea });
  if (errors.error) {
    return res.status(422).send({...errors});
  }

  const { title, description } = idea;

  const newIdea = new Idea({
    title,
    description,
    author: user.id,
  });

  const savedIdea = await newIdea.save();
  const populatedIdea = await mongooseFindById({
    id: savedIdea._id,
    scheme: 'idea',
    options: {
      populate: [ideaPopulations.author]
    }
  });

  return res.status(200).send(populatedIdea);
};

module.exports = createIdea;