var express = require('express');
var data = require('../models/data');
var router = express.Router();

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}

router.get('/', needAuth, function(req, res, next){
  data.find({}, function(err,docs){
    if (err) {
      return next(err);
    }
    res.render('manager/index',{datas:docs});
  })
});

router.get('/new', function(req,res,next){
  res.render('manager/new');
});
router.get('/:id/edit', function(req, res, next) {
  data.findById(req.params.id, function(err, data) {
    if (err) {
      return next(err);
    }
    res.render('manager/edit', {data: data});
  });
});


router.put('/:id', function(req, res, next) {

  data.findById({_id: req.params.id}, function(err, newdata) {
    if (err) {
      return next(err);
    }
    if (!newdata) {
      req.flash('danger', '존재하지 않는 데이터입니다.');
      return res.redirect('back');
    }
    newdata.name = req.body.name;
    newdata.price = req.body.price;
    newdata.number=req.body.number;
    newdata.chk_info=req.body.chk_info;
    newdata.content=req.body.content;

    newdata.save(function(err) {
      if (err) {
        return next(err);
      }
      req.flash('success', '데이터 정보가 변경되었습니다.');
      res.redirect('/manager');
    });
  });
});

router.delete('/:id', function(req, res, next) {
  data.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      return next(err);
    }
    req.flash('success', '데이터가 삭제되었습니다.');
    res.redirect('/manager');
  });
});

router.get('/:id', function(req,res,next){
  data.findById(req.params.id, function(err, newdata) {
    if (err) {
      return next(err);
    }
  res.render('./manager/show', {data: newdata})
  });
});

router.post('/',function(req,res,next){
  var newdata = new data({
    name:req.body.name,
    price:req.body.price,
    number:req.body.number,
    chk_info:req.body.chk_info,
    content:req.body.content,
  });
  newdata.save(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/manager');
  });
});

module.exports = router;
