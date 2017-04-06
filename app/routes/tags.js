var express     = require('express');
var router      = express.Router();
var tagsHandler = require("./handler/tagsHandler");

// Get all posts and tags
router.get('/', function(req, res, next) {
	tagsHandler.getTags(req, res);
});

module.exports = router;
