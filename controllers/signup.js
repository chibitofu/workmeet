var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../models');
var bcrypt = require('bcrypt');
var flash = require('connect-flash');

router.use(flash());

router.get('/', function(req, res) {
  res.render('signup');
});

router.post('/', function(req, res) {
  var user = req.body;
  var password;
  bcrypt.genSalt(10, function(err, workmeet) {
    bcrypt.hash(req.body.password1, workmeet, function(err, hash) {
      password = hash;
      var newUser = {
        name: user.name,
        email: user.email,
        password: password
      };
      db.user.findOrCreate({where: {email: user.email}, defaults : newUser } ).spread(function(user, created) {
        if(created){
          req.flash('signup', 'Account created.');
          res.redirect('/');
        } else {
          res.redirect('signup');
        }
      });
    });
  });



});


module.exports = router;
