var postsQuery  = require("../../dbHandler/postsQuery");
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

module.exports = postHandler;