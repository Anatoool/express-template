const unauthGetIdeasDB = require('./unauthGetIdeas.db');

const getIdeas = async (req, res) => {

  return res.status(200).send(req.user);

};

module.exports = getIdeas;