const createIdeaValidate = require('./createIdeaValidate');
// const userRegistrationDB = require('./registration.db');

const createIdea = async (req, res) => {
  const idea = req.body;

  const errors = await createIdeaValidate({idea, req, res});

  if (errors.error) {
    return res.status(422).send({...errors});
  }

  // userRegistrationDB({req, res, user});
  return res.status(200).send(req.body);
};

module.exports = createIdea;