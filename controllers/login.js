var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../models');
var flash = require('connect-flash');

router.use(flash());

router.get('/', function(req, res) {
  res.render('login');
});

router.post('/', function(req, res) {

  db.user.authenticate(req.body.email, req.body.password1, function(err, user) {
    if (err) {
      res.status('error').send("You encountered an error.");
    } else if (user) {
      req.session.user = user.id;
      res.redirect('/');
    } else {
      res.redirect('login');
    }
  });
});

router.get('/logout', function(req, res){
  req.session.user = false;
});

module.exports = router;
