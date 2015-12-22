var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var request = require('request');
var geocoder = require('geocoder');

router.get('/', function(req, res) {
  var apiKey = process.env.GOOGLE_PLACES_API_KEY;
  // var lat = req.query.lat;
  // var lon = req.query.lon;
  var loc = req.query.query;
  var location = req.query.geoLoc;
  if (location && loc) {
    geocoder.geocode(location, function ( err, data ) {
      var lat = data.results[0].geometry.location.lat;
      var lon = data.results[0].geometry.location.lng;
      request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lon + '&rankby=distance&keyword=' + loc + '&key=' + apiKey, function(err, response, body) {
        var data = JSON.parse(body);
        if(!err && data) {
          res.render('search', {data: data.results});
        } else {
          req.flash('noFind', "Sorry, we didn't find what you were looking for.");
          res.redirect('/');
        }
      });
    });
  } else {
    req.flash('noLoc', "Please input a search and a location.");
    res.redirect('/');
  }

});

module.exports = router;
