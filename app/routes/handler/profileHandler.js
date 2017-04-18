var profileQuery   = require("../../dbHandler/profileQuery");
var ObjectID       = require('mongodb').ObjectID
var profileHandler = {};

profileHandler.newProfile = function (req, res) {
	if(!!req.title && !!req.description) {
		return res.json({success: true});
	} else {
		return res.json({success: false, info: "Missing title or description!"});
	}
}

profileHandler.getProfiles = function (req, res) {
	profileQuery.getProfiles(req.body, function(err, result){
		if(!err && !! result && result.length){
			return res.json({success: true, info: "All profiles found!", profiles: result})
		} else {
			return res.json({success: true, info: "No profiles found!"})
		}
	});
}

profileHandler.getProfile = function (req, res) {
	if(!req.body._id) {
		return res.json({success: false, info: "Unable to process get profile request!"});
	}
	req.body._id = ObjectID(req.body._id);
	profileQuery.getProfile(req.body, function(err, result){
		if(!err && !! result){
			return res.json({success: true, info: "All profiles found!", profile: result})
		} else {
			return res.json({success: true, info: "No profiles found!"})
		}
	});
}

// Create a profile in database
profileHandler.create = function (req, res) {
	if(!req.body.name || !req.body.username || !req.body.password) {
		return res.json({success: false, info: "Name, username and password is required!"});
	}

	profileQuery.create(req.body, function(err, result){
		if(!err && !! result && result.length){
			return res.json({success: true, info: "All profiles found!", profiles: result})
		} else {
			return res.json({success: true, info: "No profiles found!"})
		}
	});
}

// Edit a profile
profileHandler.edit = function (req, res) {
	if(!req.body.query._id || !req.body.data.name || !req.body.data.username || !req.body.data.password) {
		return res.json({success: false, info: "Profile Id, name, username and password is required!"});
	}
	// delete $scope.profileQuery._id
	req.body.query._id = ObjectID(req.body.query._id);
	profileQuery.update(req.body.query, req.body.data, function(err, result){
		if(!err && !! result){
			return res.json({success: true, info: "Profile successfully update!", profiles: result})
		} else {
			return res.json({success: true, info: "No profiles found!"})
		}
	});
}

// Delete a profile
profileHandler.delete = function (req, res) {
	console.log(req.body)
	if(!req.body._id) {
		return res.json({success: false, info: "Unable to process delete request!"});
	}
	req.body._id = ObjectID(req.body._id);
	profileQuery.delete(req.body, function(err, result){
		if(!err && !! result && result.length){
			return res.json({success: true, info: "Profile successfully deleted!", profiles: result})
		} else {
			return res.json({success: true, info: "No profiles found!"})
		}
	});
}

// Inactive a profile
profileHandler.inactive = function (req, res) {
	console.log(JSON.stringify(req.body))
	if(!req.body._id) {
		return res.json({success: false, info: "Unable to process inactive request!"});
	}
	req.body._id = ObjectID(req.body._id);
	profileQuery.inactive(req.body, function(err, result){
		if(!err && !! result && result.length){
			return res.json({success: true, info: "Profile successfully deactivated!", profiles: result})
		} else {
			return res.json({success: true, info: "No profiles found!"})
		}
	});
}

// Activate a profile
profileHandler.active = function (req, res) {
	if(!req.body._id) {
		return res.json({success: false, info: "Unable to process active request!"});
	}
	req.body._id = ObjectID(req.body._id);
	profileQuery.active(req.body, function(err, result){
		if(!err && !! result && result.length){
			return res.json({success: true, info: "Profile successfully activated!", profiles: result})
		} else {
			return res.json({success: true, info: "No profiles found!"})
		}
	});
}

module.exports = profileHandler;