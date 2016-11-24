var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');

// .use - GLOBAL MIDDLEWARE - adding middlewares by using use - first it will run the middleware (here 3) and then goes to app.get..
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var recipes = [];
var id = 0;

app.get('/recipes', function(req, res){
  res.json(recipes);
});

app.get('/recipes/:id', function(req, res){
  // _ from lodash
  var recipe = _.find(recipes, {id: req.params.id});
  res.json(recipe || {});
});

app.post('/recipes', function(req, res) {
  var recipe = req.body;
  console.log(recipe)
  id++;
  recipe.id = id + '';

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
