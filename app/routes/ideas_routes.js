module.exports = function(app) {

  app.get('/ideas', (req, res) => {
    res.send('ideas')
  });

  app.post('/ideas', (req, res) => {
    res.send(res.body);
  });
};