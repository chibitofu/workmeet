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

app.listen(process.env.PORT||3000);
