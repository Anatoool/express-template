const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

module.exports = async (config) => {
  const mongooseOptions = {
    useNewUrlParser: true,
  };
  try {
    await mongoose.connect('mongodb://localhost:' + config.dbPort +'/example-db', mongooseOptions);
  } catch (err) {
    console.log(err.name);
  }
};