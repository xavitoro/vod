var app = require('./server');
var request = require('supertest');
var expect = require('chai').expect;

describe('[RECIPES]', function(){
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
    ]
  };

  it('should get all recipes', function(done) {
    request(app)
      .get('/recipes')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, resp) {
        expect(resp.body).to.be.an('array');
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
        expect(paAmbTomaquet).to.be.an('object');
        expect(paAmbTomaquet).to.eql(recipe); //.equal WILL NOT work because you're doing {}==={} whereas .eql will do a deep equals and check to see if they all have the same properties and same values
        done();
      })
  });

  // Create the Delete and Update Tests!!
});
