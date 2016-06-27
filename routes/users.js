'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account.js');

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  Account.register(new Account({username: req.body.username}), req.body.password, function(err, account) {
    if(err) {
      return res.render('register', {account: account});
    }

    passport.authenticate('local')(req, res, function() {
      res.redirect('/');
    });
  });
});

router.get('/signin', function(req, res) {
  if(req.user != null) {
    return res.redirect('/');
  }

  res.render('signin');
});

router.post('/signin', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/signin',
  failureFlash: true
}), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/users/signin');
});

module.exports = router;
