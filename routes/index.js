var express = require('express');
var router = express.Router();
var User = require('../public/js/dao/user.js');
var Post = require('../public/js/dao/post.js');
var crypto = require('crypto');

var app = express();
// 获得当前用户是否为登陆状态
app.use(function(req,res,next){
  res.locals.user = req.session.user;

  var err = req.flash('error');
  var success = req.flash('success');

  res.locals.error = err.length ? err : null;
  res.locals.success = success.length ? success : null;

  next();
});

/* 首页. */
router.get('/', function(req, res) {
  Post.get(null,function(err, posts) {
    var opts = {};
    if (err) {
      posts = [];
    }
    opts = {
      title: '首页', 
      posts: posts,
      user : req.session.user, 
      success : req.flash('success').toString(),  
      error : req.flash('error').toString()
    }; 
    res.render('index', opts);
  });
});

router.get('/reg', checkNotLogin);
router.get('/reg', function(req, res) {
  var opts = {
    title: '用户注册', 
    user : req.session.user, 
    success : req.flash('success').toString(),  
    error : req.flash('error').toString()
  };
  res.render('reg', opts);
});
router.get('/login', checkNotLogin);
router.get('/login', function(req, res) {
   var opts = {
    title: '用户登录', 
    user : req.session.user, 
    success : req.flash('success').toString(),  
    error : req.flash('error').toString()
  };
  res.render('login', opts);
});
router.get('/logout', checkLogin);
router.get('/logout', function(req, res) {
  req.session.user = null;
  req.flash('success', '退出成功');
  res.redirect('/');
});

router.get('/hello', function(req, res) {
  res.render('hello', { content: 'Hello NodeJs' });
});
router.get('/hello2', function(req, res) {
  res.render('hello', { content: 'Hello NodeJs2' });
});

// 注册
router.post('/reg', checkNotLogin);
router.post('/reg', function(req, res) {
  //检验用户两次输入的口令是否一致
  if (req.body['password-repeat'] != req.body['password']) {
    req.flash('error', '两次输入的口令不一致');
    return res.redirect('/reg');
  }
  //生成口令的散列值
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');
  var newUser = new User({
    name: req.body.username,
    password: password,
  });
  //检查用户名是否已经存在
  User.get(newUser.name, function(err, user) {
    if (user)
      err = '数据库中已存在相同名字';
    if (err) {
      req.flash('error', err);
      return res.redirect('/reg');
    }
    //如果不存在则新增用户
    newUser.save(function(err) {
      if (err) {
        req.flash('error', err);
        return res.redirect('/reg');
      }
      req.session.user = newUser;
      req.flash('success', '注册成功');
      res.redirect('/');
    });
  });
});

// 登录
router.post('/login', checkNotLogin);
router.post('/login',function(req, res) {
    //生成口令的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    User.get(req.body.username,function(err, user) {
        if (!user) {
            req.flash('error', '用户不存在');
            return res.redirect('/login');
        }
        if (user.password != password) {
            req.flash('error', '用户口令错误');
            return res.redirect('/login');
        }
        req.session.user = user;
        req.flash('success', '登录成功');
        res.redirect('/');
    });
});

// 发微博
router.post('/post', checkLogin);
router.post('/post',function(req, res) {
    var currentUser = req.session.user;
    var post = new Post(currentUser.name, req.body.post);
    post.save(function(err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success', '发表成功');
        res.redirect('/u/' + currentUser.name);
    });
});
// 用户界面
router.get('/u/:user',function(req, res) {
  User.get(req.params.user,function(err, user) {
    if (!user) {
      req.flash('error', '用户不存在');
      return res.redirect('/');
    }
    Post.get(user.name,function(err, posts) {
      var opts = {
        title: user.name,
        posts: posts,
        user : req.session.user, 
        success : req.flash('success').toString(),  
        error : req.flash('error').toString()
      };
      if (err) {
        req.flash('error', err);
        return res.redirect('/');
      }
      res.render('user', opts);
    });
  });
});

function checkLogin(req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登入');
        return res.redirect('/login');
    }
    next();
}
function checkNotLogin(req, res, next) {
    if (req.session.user) {
        req.flash('error', '已登入');
        return res.redirect('/');
    }
    next();
}
module.exports = router;

