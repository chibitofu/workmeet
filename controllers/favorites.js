var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var request = require('request');
var db = require('../models');

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
  res.render('newfav', {data: data.result, img: img});
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

  db.place_info.findOrCreate({where : {place_id :fav.placeid }, defaults: newFav } ).spread(function(user) {
    db.place_info.update(
      {wifi: user.wifi + parseInt(fav.wifi)},
      {where: {place_id: user.place_id}}
    );
    db.place_info.update(
      {seating: user.seating + parseInt(fav.seating)},
      {where: {place_id: user.place_id}}
    );
    db.place_info.update(
      {noise: user.noise + parseInt(fav.noise)},
      {where: {place_id: user.place_id}}
    );
    db.place_info.update(
      {outlets: user.outlets + parseInt(fav.outlets)},
      {where: {place_id: user.place_id}}
    );
    db.place_info.update(
      {fav_count: user.fav_count + 1},
      {where: {place_id: user.place_id}}
    );
    res.redirect('favorites');
  });
});

module.exports = router;
