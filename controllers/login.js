var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../models');
var flash = require('connect-flash');

router.use(flash());

router.get('/', function(req, res) {
  res.render('login');
});

//User login authentication//
router.post('/', function(req, res) {

  db.user.authenticate(req.body.email, req.body.password1, function(err, user) {
    if (err) {
      req.flash('noLog', "Incorrect uer info.");
      res.redirect('login');
    } else if (user) {
      req.flash('loggedin', "Welcome back " + user.name + '!');
      req.session.user = user.id;
      res.redirect('/');
    } else {
      req.flash('noLog', "Incorrect uer info.");
      res.redirect('login');
    }
  });
});

router.get('/logout', function(req, res){
  req.session.user = false;
  req.flash('logged', 'You have sucessfully logged out.');
  res.redirect('/');
});

module.exports = router;
