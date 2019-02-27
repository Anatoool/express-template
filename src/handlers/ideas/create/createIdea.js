const jwt = require('jsonwebtoken');
const jwtKey = require('../../../settings/config').jwtKey;
const createIdeaValidate = require('./createIdeaValidate');
const createIdeaDB = require('./createIdea.db');

const createIdea = async (req, res) => {
  const token = req.get('Authorization') || '';
  let author = '222';

  try {
    const tokenInfo = jwt.verify(token, jwtKey);
    author = tokenInfo.id;
  } catch (err) {

    if (
      err.name === 'TokenExpiredError' ||
      err.name === 'JsonWebTokenError'
    ) {
      return res.status(401).send(err);
    }

    throw err;
  }

  const idea = req.body;

  const errors = await createIdeaValidate({idea, req, res});

  if (errors.error) {
    return res.status(422).send({...errors});
  }

  createIdeaDB({req, res, idea, author});
};

module.exports = createIdea;