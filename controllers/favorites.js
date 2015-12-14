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
  for (var i = 0; i < data.result.photos.length; i++) {
    img.push('https://maps.googleapis.com/maps/api/place/photo?maxwidth=125&photoreference=' + data.result.photos[i].photo_reference + '&key=' + apiKey);
  }
  res.render('newfav', {data: data.result, img: img});
  });
});

router.post('/', function(req, res) {
  var fav = req.body;
  // var photos = [];
  // var type = [];
  // var hour = [];
  // hour.push(fav.hours);
  // type.push(fav.types);
  // photos.push(fav.img);
  var newFav = {
    place_id: fav.placeid,
    name: fav.name,
    icon: fav.icon,
    rating: parseFloat(fav.rating),
    lat: parseFloat(fav.lat),
    lon: parseFloat(fav.lng),
    hours: fav.hours.split(','),
    types: fav.types.split(','),
    photos: fav.img.split(','),
    url: fav.url,
    website: fav.website,
    wifi: parseInt(fav.wifi),
    seating: parseInt(fav.seating),
    noise: parseInt(fav.noise),
    outlets: parseInt(fav.outlets)
  };
  debugger;
});

module.exports = router;
