var express = require('express');
var router = express.Router();
var postHandler = require("./handler/postsHandler");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/index', { title: 'Admin | Home' });
});

router.get('/posts', function(req, res, next) {
  res.render('admin/posts', { title: 'Admin | Posts' });
});

router.post('/posts/new', function(req, res, next) {
	postHandler.newPost(req, res)
  // res.render('admin/posts/new_post', { title: 'Admin | New Post' });
});

router.get('/posts/new', function(req, res, next) {
  res.render('admin/posts/new_post', { title: 'Admin | New Post' });
});

router.get('/tags', function(req, res, next) {
  res.render('admin/tags', { title: 'Admin | Tags' });
});

module.exports = router;
