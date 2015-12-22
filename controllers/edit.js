var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../models');

router.get('/', function(req, res) {
  res.redirect('/');
});

router.get('/:id', function(req, res) {
  var place = parseInt(req.params.id);
if (req.session.user) {
    db.placeinfo.find({where: {id: place}}).then(function(places){
      db.placeinfo.find({
        where: {id: place},
        include: [db.food]
      }).then(function(food) {
        db.placeinfo.find({
          where: {id: place},
          include: [db.drink]
        }).then(function(drink) {
          db.placeinfo.find({
            where: {id: place},
            include: [db.tag]
          }).then(function(tag) {
            res.render('edit', {places: places, food: food, drink: drink, tag: tag});
          });
        });
      });
    });
  } else {
    req.flash('noEdit', 'Please log in to edit favorites');
    res.redirect('/');
  }
});


//Post route for creating a new favorite//
router.post('/confirm', function(req, res) {
  var info = req.body;
  var newInfo = {
    wifi: parseInt(info.wifi),
    noise: parseInt(info.noise),
    outlets: parseInt(info.outlets),
    seating: parseInt(info.seating)
  };

//Updates all radio button settings in edit window//
  db.placeinfo.find({where: {id: info.id}}).then(function(place) {
    db.placeinfo.update(
      {wifi: place.wifi + parseInt(info.wifi)},
      {where: {id: info.id}}
    );
    db.placeinfo.update(
      {seating: place.seating + parseInt(info.seating)},
      {where: {id: info.id}}
    );
    db.placeinfo.update(
      {outlets: place.outlets + parseInt(info.outlets)},
      {where: {id: info.id}}
    );
    db.placeinfo.update(
      {noise: place.noise + parseInt(info.noise)},
      {where: {id: info.id}}
    );
    db.placeinfo.update(
      {fav_count: place.fav_count + 1},
      {where: {id: info.id}}
    );

//Creates all new tags from edit screen//
    if (typeof info.food == 'object') {
    info.food.forEach(function(food) {
      db.food.findOrCreate({where: {food: food} } ).spread(function(foods, created) {
        db.placeinfoFoods.findOrCreate({where: {placeinfoId: info.id, foodId: foods.id} } );
      });
    });
  } else if (typeof info.food == 'string') {
    db.food.findOrCreate({where: {food: info.food} } ).spread(function(foods, created) {
      db.placeinfoFoods.findOrCreate({where: {placeinfoId: info.id, foodId: foods.id} } );
    });
  }

    if (typeof info.drink == 'object') {
    info.drink.forEach(function(drink) {
      db.drink.findOrCreate({where: {drink: drink} } ).spread(function(drinks, created) {
        db.placeinfoDrinks.findOrCreate({where: {placeinfoId: info.id, drinkId: drinks.id} } );
      });
    });
  } else if (typeof info.drink == 'string') {
      db.drink.findOrCreate({where: {drink: info.drink} } ).spread(function(drinks, created) {
        db.placeinfoDrinks.findOrCreate({where: {placeinfoId: info.id, drinkId: drinks.id} } );
      });
    }

    if (typeof info.tag == 'object') {
    info.tag.forEach(function(tag) {
      db.tag.findOrCreate({where: {tag: tag} } ).spread(function(tags, created) {
        db.placeinfoTags.findOrCreate({where: {placeinfoId: info.id, tagId: tags.id} } );
      });
    });
  } else if (typeof info.tag == 'string') {
      db.tag.findOrCreate({where: {tag: info.tag} } ).spread(function(tags, created) {
        db.placeinfoTags.findOrCreate({where: {placeinfoId: info.id, tagId: tags.id} } );
      });
    }

//Destroys all selected tags in edit scree//
    if (typeof info.foods == 'object') {
    info.foods.forEach(function(food) {
      db.food.destroy({where: {food: food} } ).spread(function(foods, created) {
        db.placeinfoFoods.destroy({where: {placeinfoId: info.id, foodId: foods.id} } );
      });
    });
  } else if (typeof info.foods == 'string') {
      db.foods.destroy({where: {food: info.foods} } ).spread(function(foods, created) {
        db.placeinfoFoods.destroy({where: {placeinfoId: info.id, foodId: foods.id} } );
      });
    }

    if (typeof info.drinks == 'object') {
    info.drinks.forEach(function(drink) {
      db.drink.destroy({where: {drink: drink} } ).spread(function(drinks, created) {
        db.placeinfoDrinks.destroy({where: {placeinfoId: info.id, drinkId: drinks.id} } );
      });
    });
  } else if (typeof info.drinks == 'string') {
      db.drink.destroy({where: {drink: info.drinks} } ).spread(function(drinks, created) {
        db.placeinfoDrinks.destroy({where: {placeinfoId: info.id, drinkId: drinks.id} } );
      });
    }

    if (typeof info.tags == 'object') {
    info.tags.forEach(function(tag) {
      db.tag.destroy({where: {tag: tag} } ).spread(function(tags, created) {
        db.placeinfoTags.destroy({where: {placeinfoId: info.id, tagId: tags.id} } );
      });
    });
  } else if (typeof info.tags == 'string') {
      db.tag.destroy({where: {tag: info.tags} } ).spread(function(tags, created) {
        db.placeinfoTags.destroy({where: {placeinfoId: info.id, tagId: tags.id} } );
      });
    }

    res.redirect('../favorites');
  });
});

module.exports = router;
