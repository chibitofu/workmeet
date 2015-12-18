var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var request = require('request');
var db = require('../models');

router.get('/', function(req, res) {
  db.user.find({
    where: {id: req.session.user},
    include: [db.placeinfo]
  }).then(function(places) {
      if (places) {
        db.food.findAll({
          include: [db.placeinfo]
        }).then(function(food) {

          db.drink.findAll({
            include: [db.placeinfo]
          }).then(function(drinks) {

            db.tag.findAll({
              include: [db.placeinfo]
            }).then(function(tag) {

              res.render('favorites', {places: places, food: food, drinks: drinks, tag: tag});
            });
          });
        });
      } else {
        res.render('favorites', {places: {places: undefined}, food: {food: undefined}, drink: {drink: undefined}, tag: {tag: undefined} } );
      }
  });
});

router.get('/:id', function(req, res) {
  var apiKey = process.env.GOOGLE_PLACES_API_KEY;
  var place = req.params.id;
  var img = [];

  request('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + place + '&key=' + apiKey, function(err, response, body) {
  var data = JSON.parse(body);

  if (data.result.photos){
    for (var i = 0; i < data.result.photos.length; i++) {
      img.push('https://maps.googleapis.com/maps/api/place/photo?maxwidth=125&photoreference=' + data.result.photos[i].photo_reference + '&key=' + apiKey);
    }
  }

    db.placeinfo.findOne({
      where: {place_id: data.result.place_id}
    }).then(function(places) {
        if (places) {
          db.placeinfo.find({
            where: {id: places.id},
            include: [db.food]
          }).then(function(food) {
            db.placeinfo.find({
              where: {id: places.id},
              include: [db.drink]
            }).then(function(drink) {
              db.placeinfo.find({
                where: {id: places.id},
                include: [db.tag]
              }).then(function(tag) {
                res.render('newfav', {data: data.result, img: img, food: food, drink: drink, tag: tag});
              });
            });
          });
        } else {
          res.render('newfav', {data: data.result, img: {img: undefined}, food: {food: undefined}, drink: {drink: undefined}, tag: {tag: undefined} } );
        }
      });
    });
});

router.post('/', function(req, res) {
  var fav = req.body;
  var hour;
  var type;
  var pic;

  if (fav.hours) {
    hour = fav.hours.split(',') ;
  } else {
    hour = [];
  }
  if (fav.types) {
    type = fav.types.split(',');
  } else {
    type = [];
  }
  if (fav.img) {
    pic = fav.img.split(',');
  } else {
    pic = [];
  }

  var newFav = {
    place_id: fav.placeid,
    name: fav.name,
    icon: fav.icon,
    rating: parseFloat(fav.rating) || 0,
    lat: parseFloat(fav.lat),
    lon: parseFloat(fav.lng),
    hours: hour,
    types: type,
    photos: pic,
    url: fav.url,
    website: fav.website,
    address: fav.address,
    phone: fav.phone
  };

  db.placeinfo.findOrCreate({where : {place_id :fav.placeid }, defaults: newFav } ).spread(function(user) {
    db.placeinfoUsers.findOrCreate({where: {userId: req.session.user, placeinfoId: user.id}}).spread(function() {
      db.placeinfo.update(
        {wifi: user.wifi + parseInt(fav.wifi)},
        {where: {place_id: user.place_id}}
      );

      db.placeinfo.update(
        {seating: user.seating + parseInt(fav.seating)},
        {where: {place_id: user.place_id}}
      );

      db.placeinfo.update(
        {noise: user.noise + parseInt(fav.noise)},
        {where: {place_id: user.place_id}}
      );

      db.placeinfo.update(
        {outlets: user.outlets + parseInt(fav.outlets)},
        {where: {place_id: user.place_id}}
      );

      db.placeinfo.update(
        {fav_count: user.fav_count + 1},
        {where: {place_id: user.place_id}}
      );

      if (typeof fav.food == 'object') {
      fav.food.forEach(function(food) {
        db.food.findOrCreate({where: {food: food} } ).spread(function(foods, created) {
          db.placeinfoFoods.findOrCreate({where: {placeinfoId: user.id, foodId: foods.id} } );
        });
      });
    } else if (typeof fav.food == 'string') {
      db.food.findOrCreate({where: {food: fav.food} } ).spread(function(foods, created) {
        db.placeinfoFoods.findOrCreate({where: {placeinfoId: user.id, foodId: foods.id} } );
      });
    }

      if (typeof fav.drink == 'object') {
      fav.drink.forEach(function(drink) {
        db.drink.findOrCreate({where: {drink: drink} } ).spread(function(drinks, created) {
          db.placeinfoDrinks.findOrCreate({where: {placeinfoId: user.id, drinkId: drinks.id} } );
        });
      });
    } else if (typeof fav.drink == 'string') {
        db.drink.findOrCreate({where: {drink: fav.drink} } ).spread(function(drinks, created) {
          db.placeinfoDrinks.findOrCreate({where: {placeinfoId: user.id, drinkId: drinks.id} } );
        });
      }

      if (typeof fav.tag == 'object') {
      fav.tag.forEach(function(tag) {
        db.tag.findOrCreate({where: {tag: tag} } ).spread(function(tags, created) {
          db.placeinfoTags.findOrCreate({where: {placeinfoId: user.id, tagId: tags.id} } );
        });
      });
    } else if (typeof fav.tag == 'string') {
        db.tag.findOrCreate({where: {tag: fav.tag} } ).spread(function(tags, created) {
          db.placeinfoTags.findOrCreate({where: {placeinfoId: user.id, tagId: tags.id} } );
        });
      }

      res.redirect('favorites');
    });
  });
});

module.exports = router;
