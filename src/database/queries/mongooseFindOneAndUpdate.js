const mongoose = require('mongoose');
const userScheme = require('../schemes/userScheme');

const User = mongoose.model("User", userScheme);

const mongooseFindOneAndUpdate = async ({
  scheme = '',
  conditions = {},
  update = {},
}) => {

  try{

    switch (scheme) {
      case 'user':
        return await User.findOneAndUpdate(conditions, update);
      default:
        throw ({ error: "Invalid scheme in mongooseFindOneAndUpdate"});
    }

  } catch (err) {

    throw err;

  }

};

module.exports = mongooseFindOneAndUpdate;