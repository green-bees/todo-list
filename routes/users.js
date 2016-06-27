var express = require('express');
var router = express.Router();


// Initial commit for user-support branch

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
