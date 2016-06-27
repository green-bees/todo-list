'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  if(req.user == null) {
    return res.redirect('/users/signin');
  }

  res.render('index', {user: req.user});
});

module.exports = router;
