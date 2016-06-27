var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { user: req.user });
});

/* GET signin page */
router.get('/signin', function (req,res) {
  res.render('signin');
});

//sends signup request, if succesful takes user to homepage, else back to signin*/
router.post('/local-reg', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

//sends signin request, if succesful takes user to homepage, else back to signin*/
router.post('/login', passport.authenticate('local-signin', {
  successRedirect: '/',
  failureRedirect: '/signin'
  })
);

//logout and return home
router.get('/logout', function (req, res) {
  var name = req.user.username;
  console.log("LOGGING OUT" + req.user.username);
  req.logout();
  res.redirect('/');
  req.session.notice = "You have successfully been logged out" + name + "!";
});

module.exports = router;
