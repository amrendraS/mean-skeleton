var express         = require('express');
var router          = express.Router();
var categoryHandler = require("./handler/categoryHandler");

// Get all posts API
router.get('/', function(req, res, next) {
	categoryHandler.getCategories(req, res);
});

// Create new posts API
router.post('/new', function(req, res, next) {
	categoryHandler.create(req, res);
});

// Get single post
router.post('/getCategory', function(req, res, next) {
	categoryHandler.getCategory(req, res);
});

// Delete a post API
router.post('/delete', function(req, res, next) {
	categoryHandler.delete(req, res);
});

// Edit a post API
router.post('/edit', function(req, res, next) {
	categoryHandler.edit(req, res);
});

module.exports = router;
