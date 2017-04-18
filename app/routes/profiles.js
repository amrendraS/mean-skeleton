var express        = require('express');
var router         = express.Router();
var profileHandler = require("./handler/profileHandler");

// Get all profiles API
router.get('/', function(req, res, next) {
	profileHandler.getProfiles(req, res);
});

// Create new profiles API
router.post('/new', function(req, res, next) {
	profileHandler.create(req, res);
});

// Get single profile
router.post('/getProfile', function(req, res, next) {
	profileHandler.getProfile(req, res);
});

// Delete a profile API
router.post('/delete', function(req, res, next) {
	profileHandler.delete(req, res);
});

// Inactive a profile API
router.post('/inactive', function(req, res, next) {
	// console.log(JSON.stringify(req))
	profileHandler.inactive(req, res);
});

// Activate a profile API
router.post('/active', function(req, res, next) {
	profileHandler.active(req, res);
});

// Edit a profile API
router.post('/edit', function(req, res, next) {
	profileHandler.edit(req, res);
});

module.exports = router;
