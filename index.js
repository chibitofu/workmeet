var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var request = require('request');
var ejslayouts = require('express-ejs-layouts');
var db = require('./models');
var bcrypt = require('bcrypt');
var dotenv = require('dotenv');
var geocoder = require('geocoder');
dotenv.load();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views') );
app.use(ejslayouts);
app.use(bodyparser.urlencoded({extended:false} ) );

app.use('/search', require('./controllers/search') );
app.use('/favorites', require('./controllers/favorites') );


app.get('/', function(req, res) {
  res.render('index');
});

app.get('/location', function(req, res) {
  var location = req.query.geoLocation;
  var hasNum = /\d/;
  if( hasNum.test(location) ) {
    var latLonString = location.split(',', 2);
    var latLon = {lat: parseFloat(latLonString[0]), lon: parseFloat(latLonString[1])};
    geocoder.reverseGeocode( latLon.lat,latLon.lon, function ( err, data ) {
      console.log(data.results[0].formatted_address);
      res.redirect('index');
    });
  } else if ( typeof location == 'string') {
    geocoder.geocode(location, function ( err, data ) {
      debugger;
      if (err) {
        console.log(err);
      } else {
        console.log(data.results[0].geometry.location);
      }
      res.redirect('index');
    });
  }
});

app.listen(process.env.PORT||3000);
