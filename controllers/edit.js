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
    res.redirect('../favorites');
  });
});

module.exports = router;
