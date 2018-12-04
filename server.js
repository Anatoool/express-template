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

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tolya0403@gmail.com',
    pass: '7815318220pochta'
  }
});

const mailOptions = {
  from: 'tolya0403@gmail.com',
  to: 'anatoool@yandex.ru',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

app.listen(config.port, () => {
  console.log('Server started on ' + config.port);
});
