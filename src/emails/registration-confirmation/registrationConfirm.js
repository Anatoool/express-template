const nodemailer = require('nodemailer');

const userSendConfirmationMail = (
  {
    email,
    confirmCode,
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
    subject: 'Confirm registration',
    text: `Confirmation code: ${confirmCode}`
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