var express = require('express');
var app = express();
var bodyparser = require('body-parser');
var request = require('request');
var ejslayouts = require('express-ejs-layouts');
var db = require('./models');
var bcrypt = require('bcrypt');
var dotenv = require('dotenv');
dotenv.load();

var favoritesController = require('./controllers/favorites');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views') );
app.use(ejslayouts);
app.use(bodyparser.urlencoded({extended:false} ) );

app.use('/search', require('./controllers/search') );
app.use('/favorites', require('./controllers/favorites') );


app.get('/', function(req, res) {
  res.render('index');
});

// app.get('/search', function(req, res) {
//   var apiKey = process.env.GOOGLE_PLACES_API_KEY;
//   var lat = req.query.lat;
//   var lon = req.query.lon;
//   var loc = req.query.query;
//
//   request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + lat + ',' + lon + '&rankby=distance&keyword=' + loc + '&key=' + apiKey, function(err, response, body) {
//     var data = JSON.parse(body);
//     if(!err && data) {
//       res.render('search', {data: data.results});
//     } else {
//       res.redirect('index');
//     }
//   });
//
// });






// app.get('/', function(req, res) {
//   var apiKey = process.env.GOOGLE_PLACES_API_KEY;
//   request('https://maps.googleapis.com/maps/api/place/autocomplete/nearbysearch/json?location=47.6738,-122.3419&radius=500&types=food&key=' + apiKey, function(err, response, body) {
//   var json = JSON.parse(body);
//   request('https://maps.googleapis.com/maps/api/place/details/json?placeid=' + json.results[0].place_id + '&key=' + apiKey, function(error, resp, bodies) {
//     var data = JSON.parse(bodies);
//     var img = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=' + data.result.photos[0].photo_reference + '&key=' + apiKey;
//         console.log(img);
//             res.render('index');
//
//     });
//
//
//   });
//
// });

app.listen(process.env.PORT||3000);
