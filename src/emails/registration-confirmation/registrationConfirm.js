const nodemailer = require('nodemailer');

const userSendConfirmationMail = (
  {
    email,

  }
  ) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'tolya0403@gmail.com',
      pass: '7815318220pochta'
    }
  });

  const mailOptions = {
    from: 'tolya0403@gmail.com',
    to: email,
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
};

module.exports = userSendConfirmationMail;