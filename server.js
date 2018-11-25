const express = require('express');
const bodyParser = require('body-parser');
const config = require('./app/settings/config');
const appRoutes = require('./app/routes/index');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.disable('x-powered-by');

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
appRoutes(app);

app.listen(config.port, () => {
  console.log('Server started on ' + config.port);
});
