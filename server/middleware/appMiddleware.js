var morgan = require('morgan');
var bodyParser = require('body-parser');
var express = require('express');

// SETUP global middleware here
module.exports = function(app) {
  app.use(morgan('dev'));
  app.use(express.static('client'));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};
