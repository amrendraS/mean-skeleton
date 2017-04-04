var postsQuery  = require("../../dbHandler/postsQuery");
var ObjectID = require('mongodb').ObjectID
var postHandler = {};

postHandler.newPost = function (req, res) {
	if(!!req.title && !!req.description) {
		return res.json({success: true});
	} else {
		return res.json({success: false, info: "Missing title or description!"});
	}
}

postHandler.getPosts = function (req, res) {
	postsQuery.getPosts(req.body, function(err, result){
		if(!err && !! result && result.length){
			return res.json({success: true, info: "All posts found!", posts: result})
		} else {
			return res.json({success: true, info: "No posts found!"})
		}
	});
}

postHandler.getPost = function (req, res) {
	if(!req.body._id) {
		return res.json({success: false, info: "Unable to process get post request!"});
	}
	req.body._id = ObjectID(req.body._id);
	postsQuery.getPost(req.body, function(err, result){
		if(!err && !! result){
			return res.json({success: true, info: "All posts found!", post: result})
		} else {
			return res.json({success: true, info: "No posts found!"})
		}
	});
}

// Create a post in database
postHandler.create = function (req, res) {
	if(!req.body.title || !req.body.description) {
		return res.json({success: false, info: "Title and Description is required!"});
	}

	postsQuery.create(req.body, function(err, result){
		if(!err && !! result && result.length){
			return res.json({success: true, info: "All posts found!", posts: result})
		} else {
			return res.json({success: true, info: "No posts found!"})
		}
	});
}

// Edit a post
postHandler.edit = function (req, res) {
	console.log(req.body)
	if(!req.body.query._id || !req.body.data.title || !req.body.data.description) {
		return res.json({success: false, info: "Post Id, Title and Description is required!"});
	}
	// delete $scope.post._id
	req.body.query._id = ObjectID(req.body.query._id);
	postsQuery.update(req.body.query, req.body.data, function(err, result){
		if(!err && !! result){
			return res.json({success: true, info: "Post successfully update!", posts: result})
		} else {
			return res.json({success: true, info: "No posts found!"})
		}
	});
}

// Delete a post
postHandler.delete = function (req, res) {
	if(!req.body._id) {
		return res.json({success: false, info: "Unable to process delete request!"});
	}

	postsQuery.delete(req.body, function(err, result){
		if(!err && !! result && result.length){
			return res.json({success: true, info: "All posts found!", posts: result})
		} else {
			return res.json({success: true, info: "No posts found!"})
		}
	});
}

// Inactive a post
postHandler.inactive = function (req, res) {
	if(!req.body._id) {
		return res.json({success: false, info: "Unable to process inactive request!"});
	}
	req.body._id = ObjectID(req.body._id);
	postsQuery.inactive(req.body, function(err, result){
		if(!err && !! result && result.length){
			return res.json({success: true, info: "All posts found!", posts: result})
		} else {
			return res.json({success: true, info: "No posts found!"})
		}
	});
}

// Activate a post
postHandler.active = function (req, res) {
	if(!req.body._id) {
		return res.json({success: false, info: "Unable to process active request!"});
	}
	req.body._id = ObjectID(req.body._id);
	postsQuery.active(req.body, function(err, result){
		if(!err && !! result && result.length){
			return res.json({success: true, info: "All posts found!", posts: result})
		} else {
			return res.json({success: true, info: "No posts found!"})
		}
	});
}

module.exports = postHandler;