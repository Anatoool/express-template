const mongoose = require('mongoose');
const ideaScheme = require('../../../database/schemes/ideaScheme');

const Idea = mongoose.model("Idea", ideaScheme);

const createIdeaDB = async ({req, res, idea, author}) => {

  const { title = '', description = '' } = idea;

  const newIdea = new Idea({
    title,
    description,
    author,
  });

  try{

    const savedIdeaResponse = await newIdea.save();
    return res.status(200).send(savedIdeaResponse);

  } catch (err) {
    return res.status(500).send(err);
  }

};

module.exports = createIdeaDB;