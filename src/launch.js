const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const chalk = require('chalk');

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

module.exports = async (config) => {
  const mongooseOptions = {
    useNewUrlParser: true,
  };
  try {
    await mongoose.connect('mongodb://localhost:' + config.dbPort +'/first-db', mongooseOptions);

    mongoose.connection.on('connected', function(){
      console.log(connected("Mongoose default connection is open to ", 'mongodb://localhost:' + config.dbPort +'/example-db'));
    });

    mongoose.connection.on('error', function(err){
      console.log(error("Mongoose default connection has occured "+err+" error"));
    });

    mongoose.connection.on('disconnected', function(){
      console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', function(){
      mongoose.connection.close(function(){
        console.log(termination("Mongoose default connection is disconnected due to application termination"));
        process.exit(0)
      });
    });

  } catch (err) {
    console.log('Mongoose connect error!' + err.name);
  }
};