module.exports = function(app, passport) {

  app.post('/signin',
   passport.authenticate('local-signin', {failureRedirect : '/signin', failureFlash : true}),
   function(req,res){
     var email=req.body.email;
     var password=req.body.password;
     if(email==='manager@naver.com' && password==='manager12!')
     {
       res.redirect('/manager');
     }
     else
     {
       res.redirect('/user');
     }
   }
);
  app.get('/auth/facebook',
    passport.authenticate('facebook', { scope : 'email' })
  );

  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect : '/signin',
      failureFlash : true // allow flash messages
    }),
    function(req, res, next) {
      req.flash('success', '로그인되었습니다.');
      res.redirect('/user');
    }
  );

  app.get('/signout', function(req, res) {
    req.logout();
    req.flash('success', '로그아웃 되었습니다.');
    res.redirect('/');
  });
};
