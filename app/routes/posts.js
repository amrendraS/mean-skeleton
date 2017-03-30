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

module.exports = router;
