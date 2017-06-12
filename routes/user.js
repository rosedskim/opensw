var express = require('express');
var data=require('../models/data');
var User=require('../models/User');
var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}

router.get('/', needAuth, function(req, res, next) {
  data.find({}, function(err,docs){
    if(err){
      return next(err);
    }
    res.render('user/index',{datas:docs});
  })
});

router.get('/new', function(req,res,next){
  res.render('user/new');
});
router.get('/:id', function(req,res,next){
  data.findById(req.params.id, function(err, newdata) {
    if (err) {
      return next(err);
    }
  res.render('./user/show_content', {data: newdata})
  });
});

router.post('/', function(req, res, next) {
  var condition = new data({
    price: req.body.price,
    number: req.body.number,
    chk_info: req.body.chk_info
  })
  data.find({$and: [{"price":{$lte:condition.price}},{"number":{$lte:condition.number}}, {"chk_info":condition.chk_info}]},function(err,models){
    if(err) return console.error(err);
    console.log(models);
    res.render('user/show', {datas:models});
  })
});

module.exports = router;
