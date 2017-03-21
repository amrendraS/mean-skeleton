var postHandler = {};

postHandler.newPost = function (req, res) {
	if(!!req.title && !!req.description) {
		return res.json({success: true});
	} else {
		return res.json({success: false, info: "Missing title or description!"});
	}
}

module.exports = postHandler;