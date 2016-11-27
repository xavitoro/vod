var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');

var recipeRouter = require('./recipes');

// .use - GLOBAL MIDDLEWARE - adding middlewares by using use - first it will run the middleware (here 3) and then goes to app.get..
app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// this is called mounting. when ever a req comes in for
// '/recipe' we want to use this router
app.use('/recipes', recipeRouter);

app.use(function(err, req, res, next) {
  if (err) {
    console.log(err.message);
    res.status(500).send(err);
  }
});

app.listen(3000);
console.log('on port 3000');
