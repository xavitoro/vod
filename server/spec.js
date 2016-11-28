var app = require('./server');
var request = require('supertest');
var expectChai = require('chai').expect;
require('colors');

describe('[RECIPES]'.bgMagenta, function(){
  var recipe = {
    "recipeTitle": "Pa amb tomàquet",
    "recipeSlug": "pa-amb-tomaquet",
    "recipeDescription": "Grilled bread with tomatoe, olive, pepper and salt.",
    "recipeCategory": "Spanish",
    "recipeTags": [
      "healthy",
      "grilled"
    ],
    "recipeLearningPath": [
      "spanish-basics"
    ],
    "recipeType": "Starter",
    "recipePicture": {
      "ingredientsPicture": "url1",
      "finalPicture": "url2"
    },
    "recipeVideo": {
      "videoThumbnail": "url3",
      "videoPreview": "url4",
      "videoFull": "url5"
    },
    "recipeDetailedInformation": {
      "recipeLength": "5",
      "recipeDifficulty": "Easy",
      "recipeServings": "2"
    },
    "authorInformation": {
      "authorThumbnail": "url6",
      "authorName": "Alexandre",
      "authorDescription": "Wannabe chef!"
    },
    "recipeIngredientsList": [
      {
        "ingredient": "2",
        "quantity": "slices",
        "quantityUnit": "bread"
      },
      {
        "ingredient": "1",
        "quantity": "tbsp",
        "quantityUnit": "olive oil"
      },
      {
        "ingredient": "1",
        "quantity": "pinch",
        "quantityUnit": "salt"
      },
      {
        "ingredient": "1",
        "quantity": "pinch",
        "quantityUnit": "pepper"
      }
    ],
    "recipeStepsList": [
      {
        "stepPicture": "url7",
        "stepDescription": "Toast the bread slices.",
        "stepTips": "Crunchy outside, soft inside!"
      },
      {
        "stepPicture": "url8",
        "stepDescription": "Spread with tomato first, add salt and pepper and finally the olive oil.",
        "stepTips": "You could also spread with garlic before the tomato to obtain a more tasty flavor."
      }
    ],
    "id": "1"
  };

  it('should get all recipes', function(done) {
    request(app)
      .get('/recipes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expectChai(resp.body).to.be.an('array');
        done();
      })
  });

  it('should get one recipe', function(done) {
    request(app)
      .get('/recipes/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expectChai(resp.body).to.be.an('object');
        done();
      })
  });

  it('should create a recipe', function(done) {

    request(app)
      .post('/recipes')
      .send(recipe)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function(err, resp) {
        var paAmbTomaquet = resp.body;
        expectChai(paAmbTomaquet).to.be.an('object');
        expectChai(paAmbTomaquet).to.eql(recipe); //.equal WILL NOT work because you're doing {}==={} whereas .eql will do a deep equals and check to see if they all have the same properties and same values
        done();
      })
  });


  it('should delete a recipe', function(done) {
    request(app)
      .post('/recipes')
      .send(recipe)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .end(function(err, resp) {
        var paAmbTomaquet = resp.body;
        request(app)
          .delete('/recipes/' + paAmbTomaquet.id)
          .end(function(err, resp) {
            var deletedRecipe = resp.body
            expectChai(deletedRecipe).to.eql(paAmbTomaquet);
            done();
          });
      })
  });

  it('should update a recipe', function(done) {
    request(app)
      .post('/recipes')
      .send(recipe)
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        var recipe = resp.body;
        request(app)
          .put('/recipes/' + recipe.id)
          .send({
            recipeTitle: 'Guacamole'
          })
          .end(function(err, resp) {
            var recipeTitle = resp.body.recipeTitle
            expectChai(recipeTitle).to.equal('Guacamole');
            done();
          });
      })
  });
});
