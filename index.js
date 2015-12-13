var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var request = require('request');
var ejslayouts = require('express-ejs-layouts');
var db = require('./models');
var bcrypt = require('bcrypt');
var assert = require('assert');
var dotenv = require('dotenv');
dotenv.load();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views') );
app.use(ejslayouts);
app.use(bodyparser.urlencoded({extended:false} ) );

app.get('/', function(req, res) {
  var apiKey = process.env.GOOGLE_PLACES_API_KEY;
  request('https://maps.googleapis.com/maps/api/place/autocomplete/nearbysearch/json?location=47.6738,-122.3419&radius=500&types=food&key=' + apiKey, function(err, response, body) {
  var json = JSON.parse(body);
  request('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + json.results[0].place_id + '&key=' + apiKey, function(error, resp, bodies) {
    var data = JSON.parse(bodies);
    var img = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + data.result.photos[0].photo_reference + '&key=' + apiKey;
        console.log(img);
            res.render('index');

    });


  });

});

app.listen(process.env.PORT||3000);
