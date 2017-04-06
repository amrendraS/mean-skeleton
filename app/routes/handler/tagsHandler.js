var postsQuery  = require("../../dbHandler/postsQuery");
var _           = require('underscore');
var ObjectID    = require('mongodb').ObjectID
var tagsHandler = {};

tagsHandler.getTags = function (req, res) {
	postsQuery.getPosts(req.body, function(err, result){
		var tags = {};
		if(!err && !! result && result.length){
			for (var i = 0; i < _.pluck(result, 'tags').length; i++) {
				var currentPostTags = _.pluck(result, 'tags')[i];
				if(!!currentPostTags && currentPostTags.length>0) {
					for (var j = 0; j < currentPostTags.length; j++) {
						tags[currentPostTags[j].text] = !!tags[currentPostTags[j].text] ? tags[currentPostTags[j].text] + 1 : 1;
					}
				}
			}
			return res.json({success: true, info: "All tags found!", tags: tags})
		} else {
			return res.json({success: true, info: "No posts found!"})
		}
	});
}

module.exports = tagsHandler;