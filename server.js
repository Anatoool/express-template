require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('./src/settings/config');
const appRoutes = require('./src/routes/index');
const swaggerUi = require('swagger-ui-express');
const launch = require('./src/launch');
const swaggerDocument = require('./swagger.json');

launch(config);

const app = express();
app.disable('x-powered-by');

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
appRoutes(app);

app.listen(config.port, () => {
  console.log('Server started on ' + config.port);
});
