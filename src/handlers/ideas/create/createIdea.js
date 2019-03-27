const mongoose = require('mongoose');
const createIdeaValidate = require('./createIdeaValidate');
const ideaScheme = require('../../../database/schemes/ideaScheme');

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

  const savedIdeaResponse = await newIdea.save();
  return res.status(200).send(savedIdeaResponse);
};

module.exports = createIdea;