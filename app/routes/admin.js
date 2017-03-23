var express      = require('express');
var router       = express.Router();
var postsHandler = require("./handler/postsHandler");
var loginHandler = require("./handler/loginHandler");

// Register admin API
router.post('/register', function(req, res, next) {
	loginHandler.register(req, res);
});

router.post('/login', function(req, res, next) {
	console.log(req.body)
  // res.render('admin/index', { title: 'Admin | Home' });
  loginHandler.login(req, res);
});

router.get('/posts', function(req, res, next) {
  res.render('admin/posts', { title: 'Admin | Posts' });
});

router.post('/posts/new', function(req, res, next) {
	postsHandler.newPost(req, res)
  // res.render('admin/posts/new_post', { title: 'Admin | New Post' });
});

router.get('/posts/new', function(req, res, next) {
  res.render('admin/posts/new_post', { title: 'Admin | New Post' });
});

router.get('/tags', function(req, res, next) {
  res.render('admin/tags', { title: 'Admin | Tags' });
});

module.exports = router;
