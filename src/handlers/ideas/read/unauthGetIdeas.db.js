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

    // const ideas = await Idea.paginate({}, {page, limit}).populate('author', 'name email');
    const populate = {
      path: 'author',
      select: 'name resource'
    };
    const ideas = await Idea.paginate({}, {page: +page, limit: +pageSize, populate});

    return res.status(200).send(ideas);

  } catch (err) {
    return res.status(500).send(err);
  }

};

module.exports = unauthGetIdeasDB;