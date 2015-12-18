var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var request = require('request');
var ejslayouts = require('express-ejs-layouts');
var db = require('./models');
var bcrypt = require('bcrypt');
var dotenv = require('dotenv');
var geocoder = require('geocoder');
var flash = require('connect-flash');
var session = require('express-session');
dotenv.load();

//Standard middleware//
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views') );
app.use(ejslayouts);
app.use(bodyparser.urlencoded({extended:false} ) );
app.use(flash());

//Session key//
app.use(session({
  secret: 'allyourbases',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  if (req.session.user) {
    db.user.findById(req.session.user).then(function(user){
      req.currentUser = user;
      next();
    });
  } else {
    req.currentUser = false;
    next();
  }
});

app.use(function(req, res, next){
  req.session.lastPage = req.header('Referer');
  res.locals.lastPage = req.session.lastPage;
  next();
});

//Middleware for alerts//
app.use(function(req, res, next) {
  res.locals.currentUser = req.currentUser;
  res.locals.alerts = req.flash();
  next();
  //Pass in alerts//
});

//Calling my controllers//
app.use('/search', require('./controllers/search') );
app.use('/favorites', require('./controllers/favorites') );
app.use('/signup', require('./controllers/signup') );
app.use('/login', require('./controllers/login') );
app.use('/edit', require('./controllers/edit') );

app.get('/', function(req, res) {
  res.render('index', {alert: req.flash()});
});

//Grabs location based off of browsers geoposition through ajax.//
app.post('/location', function(req, res) {

  var location = req.body.id;
  var hasNum = /\d/;
  if( hasNum.test(location) ) {
    var latLonString = location.split(',', 2);
    var latLon = {lat: parseFloat(latLonString[0]), lon: parseFloat(latLonString[1])};
    geocoder.reverseGeocode( latLon.lat,latLon.lon, function ( err, data ) {
      var location = data.results[0];
      if (err) {
        res.status('error', 500);
      } else {
        res.status(200, 'success').json(location);
      }
    });
  } else if ( typeof location == 'string') {
    geocoder.geocode(location, function ( err, data ) {
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
