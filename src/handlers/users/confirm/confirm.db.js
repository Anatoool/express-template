const mongoose = require('mongoose');
const userScheme = reqlib('/src/database/schemes.v.0.1/userScheme');
const User = mongoose.model("User", userScheme);

const userConfirmEmailDB = async ({req, res, code = ''}) => {

  console.log(code);

  try{
    const updateResult = await User.findOneAndUpdate(
      { confirmCode: code },
      {
        $set: {confirmed: true},
      }
    );
    if (updateResult === null) {
      return res.status(403).send({
        error: true,
        _message: "User email confirmation error",
        message: "User email confirmation error",
        name: "ConfirmEmailError",
      });
    }
    return res.status(200).send({message: "success"});
  } catch (err) {
    return res.status(500).send(err);
  }

};

module.exports = userConfirmEmailDB;