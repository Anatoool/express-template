const createIdea = require('../handlers/ideas/create/createIdea');

module.exports = function(app) {

  // app.get('/ideas', (req, res) => {
  //   const token = req.headers.authorization.replace('Bearer ', '');
  //   try {
  //     const decoded = jwt.verify(token, 'wrong-secret');
  //   } catch(err) {
  //     console.log(err);
  //   }
  //     res.send(token)
  // });

  app.post('/ideas', createIdea);
};