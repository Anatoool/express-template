const mongoose = require('mongoose');
const userScheme = require('../schemes/userScheme');

const User = mongoose.model("User", userScheme);

const mongooseFindByIdAndUpdate = async ({
  scheme = '',
  id,
  update = {},
}) => {

  try{

    switch (scheme) {
      case 'user':
        return await User.findByIdAndUpdate(id, update);
      default:
        throw ({ error: "Invalid scheme in mongooseFindByIdAndUpdate"});
    }

  } catch (err) {

    throw err;

  }

};

module.exports = mongooseFindByIdAndUpdate;