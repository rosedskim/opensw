var express = require('express'),
    user = require('./user'),
    User = require('../models/User');
var router = express.Router();

/* GET home page. */
//get
router.get('/', function(req, res, next) {
  res.render('index'); //req받으면 res render : 화면에 뿌려줌 index(views의 index.jade)를 뿌려라
});

router.get('/signin', function(req, res, next) {
  res.render('signin');
});

router.use('/user', user);

module.exports = router;
