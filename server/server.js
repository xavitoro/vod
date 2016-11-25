var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');

var recipes = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

// .use - GLOBAL MIDDLEWARE - adding middlewares by using use - first it will run the middleware (here 3) and then goes to app.get..
app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
  if (err) {
    res.status(500).send(err);
  }
});

app.param('id', function(req, res, next, id) {
  var recipe = _.find(recipes, {id: id});

  if (recipe) {
    req.recipe = recipe;
    next();
  } else {
    res.send();
  }
});

app.get('/recipes', function(req, res){
  res.json(recipes);
});

app.get('/recipes/:id', function(req, res){
  // _ from lodash
  // Not needed anymore due to the new middleware .param
  // var recipe = _.find(recipes, {id: req.params.id});
  res.json(recipe || {});
});

app.post('/recipes', function(req, res) {
  var recipe = req.body;
  // console.log(recipe)
  // moved to the updateID function
  // id++;
  // recipe.id = id + '';

  recipes.push(recipe);

  //we send back the resource created to avoid making a new call
  res.json(recipe);
});


app.put('/recipes/:id', function(req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id
  }

  var recipe = _.findIndex(recipes, {id: req.params.id});
  if (!recipes[recipe]) {
    res.send();
  } else {
    var updatedRecipe = _.assign(recipes[recipe], update);
    res.json(updatedRecipe);
  }
});

app.delete('/recipes/:id', function(req, res) {
  var recipe = _.findIndex(recipes, {id: req.params.id});
  if (!recipes[recipe]) {
    res.send();
  } else {
    var deletedRecipe = recipes[recipe];
    recipes.splice(recipe, 1);
    res.json(deletedRecipe);
  }

  var update = req.body;
  if (update.id) {
    delete update.id
  }


});


app.listen(3000);
console.log('on port 3000');
