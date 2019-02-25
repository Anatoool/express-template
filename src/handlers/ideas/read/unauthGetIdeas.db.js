const mongoose = require('mongoose');
const ideaScheme = require('../../../database/schemes/ideaScheme');

const Idea = mongoose.model("Idea", ideaScheme);

const unauthGetIdeasDB = async ({req, res}) => {

  const { query } = req;
  const {
    page = 1,
    pageSize = 10,
  } = query;

  try{

    const options = {
      limit: +pageSize,
      skip: +pageSize * (+page - 1),
    };

    const populate = {
      path: 'author',
      select: 'name resource'
    };

    const ideas = await Idea.find({}, null, options).populate(populate);

    return res.status(200).send(ideas);

  } catch (err) {
    return res.status(500).send(err);
  }

};

module.exports = unauthGetIdeasDB;