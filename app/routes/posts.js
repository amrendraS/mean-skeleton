var express      = require('express');
var router       = express.Router();
var postsHandler = require("./handler/postsHandler");

// Get all posts API
router.get('/', function(req, res, next) {
	postsHandler.getPosts(req, res);
});

// Create new posts API
router.post('/new', function(req, res, next) {
	postsHandler.create(req, res);
});

// Get single post
router.post('/getPost', function(req, res, next) {
	postsHandler.getPost(req, res);
});

// Delete a post API
router.post('/delete', function(req, res, next) {
	postsHandler.delete(req, res);
});

// Inactive a post API
router.post('/inactive', function(req, res, next) {
	postsHandler.inactive(req, res);
});

// Activate a post API
router.post('/active', function(req, res, next) {
	postsHandler.active(req, res);
});

// Edit a post API
router.post('/edit', function(req, res, next) {
	postsHandler.edit(req, res);
});

module.exports = router;
