const jwt = require('jsonwebtoken');

module.exports = function(app) {

  app.get('/ideas', (req, res) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    try {
      const decoded = jwt.verify(token, 'wrong-secret');
    } catch(err) {
      console.log(err);
    }
      res.send(token)
  });

  app.post('/ideas', (req, res) => {
    res.send(res.body);
  });
};