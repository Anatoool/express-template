const mongoose = require('mongoose');
const userScheme = require('../schemes/userScheme');
const ideaScheme = require('../schemes/ideaScheme');

const User = mongoose.model('User', userScheme);
const Idea = mongoose.model('Idea', ideaScheme);

const mongooseFind = async ({
  scheme = '',
  conditions = {}, // conditions of find
  projection = null, // return fields
  options = {}, // options of query
  pagination = {
    page: 1,
    pageSize: 25,
  },
}) => {

  const resultOptions = {
    ...options,
    limit: +pagination.pageSize,
    skip: (+pagination.page - 1) * +pagination.pageSize,
  };

  const resultObject = {};
  let total = 0;

  try {

    switch (scheme) {
      case 'user':
        resultObject.items = await User.find(conditions, projection, resultOptions);
        total = await User.countDocuments(conditions);
        break;
      case 'idea':
        resultObject.items = await Idea.find(conditions, projection, resultOptions);
        total = await Idea.countDocuments(conditions);
        break;
      default:
        throw ({ error: "Invalid scheme in mongooseFind"});
    }

    resultObject.pagination = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      total,
      maxPages: Math.ceil(total / pagination.pageSize),
    };

    return resultObject;

  } catch (err) {

    throw err;

  }

};

module.exports = mongooseFind;