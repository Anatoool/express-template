const mongoose = require('mongoose');

module.exports = async (config) => {
    const mongooseOptions = {
      useNewUrlParser: true,
    };
    try {
        await mongoose.connect('mongodb://localhost:' + config.dbPort +'/magora', mongooseOptions);
    } catch (err) {
        console.log(err.name);
    }
};