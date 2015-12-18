var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../models');

router.get('/:id', function(req, res) {
  var place = parseInt(req.params.id);
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
});

router.post('/confirm', function(req, res) {
  var info = req.body;
  var newInfo = {
    wifi: parseInt(info.wifi),
    noise: parseInt(info.noise),
    outlets: parseInt(info.outlets),
    seating: parseInt(info.seating)
  };

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

    if (typeof info.food == 'object') {
    info.food.forEach(function(food) {
      db.food.destroy({where: {food: food} } ).spread(function(foods, created) {
        db.placeinfoFoods.destroy({where: {placeinfoId: info.id, foodId: foods.id} } );
      });
    });
  } else if (typeof info.food == 'string') {
      db.food.destroy({where: {food: info.food} } ).spread(function(foods, created) {
        db.placeinfoFoods.destroy({where: {placeinfoId: info.id, foodId: foods.id} } );
      });
    }

    if (typeof info.drink == 'object') {
    info.drink.forEach(function(drink) {
      db.drink.destroy({where: {drink: drink} } ).spread(function(drinks, created) {
        db.placeinfoDrinks.destroy({where: {placeinfoId: info.id, drinkId: drinks.id} } );
      });
    });
  } else if (typeof info.drink == 'string') {
      db.drink.destroy({where: {drink: info.drink} } ).spread(function(drinks, created) {
        db.placeinfoDrinks.destroy({where: {placeinfoId: info.id, drinkId: drinks.id} } );
      });
    }

    if (typeof info.tag == 'object') {
    info.tag.forEach(function(tag) {
      db.tag.destroy({where: {tag: tag} } ).spread(function(tags, created) {
        db.placeinfoTags.destroy({where: {placeinfoId: info.id, tagId: tags.id} } );
      });
    });
  } else if (typeof info.tag == 'string') {
      db.tag.destroy({where: {tag: info.tag} } ).spread(function(tags, created) {
        db.placeinfoTags.destroy({where: {placeinfoId: info.id, tagId: tags.id} } );
      });
    }
    res.redirect('../favorites');
  });
});

module.exports = router;