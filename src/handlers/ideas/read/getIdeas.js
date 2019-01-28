// const jwt = require('jsonwebtoken');
// const jwtKey = require('../../../settings/config').jwtKey;
const unauthGetIdeasDB = require('./unauthGetIdeas.db');

const getIdeas = async (req, res) => {
  // const token = req.get('Authorization') || '';
  // let publisherId = '';

  // try {
  //   const tokenInfo = jwt.verify(token, jwtKey);
  //   publisherId = tokenInfo.id;
  // } catch (err) {
  //   return res.status(401).send(err);
  // }

  // const idea = req.body;

  unauthGetIdeasDB({ req, res });
};

module.exports = getIdeas;