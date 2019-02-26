const moment = require('moment');
const jwt = require('jsonwebtoken');
const usersFindOne = require('../../../database/queries/users/usersFindOne');
const usersFindByIdAndUpdate = require('../../../database/queries/users/usersFindByIdAndUpdate');
const jwtKey = require('../../../settings/config').jwtKey;

const userRefreshToken = async (req, res) => {

  res.status(200).send(true);

};

module.exports = userRefreshToken;