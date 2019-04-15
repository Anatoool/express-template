const express = require('express');
const bodyParser = require('body-parser');
const config = require('./src/settings/config');
const appRoutes = require('./src/routes/index');
const swaggerUi = require('swagger-ui-express');
const launch = require('./src/launch');
const serverCORS = require('./server-cors');
const createSwaggerDocument = require('./swagger/swaggerDocument');

launch(config);

const app = express();
app.disable('x-powered-by');

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(createSwaggerDocument()));
app.use(bodyParser.json());

app.use(serverCORS);

const api = express.Router();
appRoutes(api);
app.use('/api', api);

app.use(function(err, req, res, next) {
  res.status(500).send(err);
  next(err);
});

app.listen(config.port, () => {
  console.log('Server started on ' + config.port);
});
