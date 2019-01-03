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
      user: 'nodemailer.email@gmail.com',
      pass: '987654321test'
    }
  });

  const mailOptions = {
    from: 'nodemailer.email@gmail.com',
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