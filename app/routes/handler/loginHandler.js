var adminQuery = require("../../dbHandler/adminQuery")
var loginHandler = {};

loginHandler.login = function (req, res) {
	if(!!req.body.username && !!req.body.password) {
		// return res.json({success: true});
		adminQuery.getAdmin(req.body, function(err, response){
			if(response) {
				return res.json({success: true});
			} else {
				return res.json({success: false, info: "Wrong username or password!"});
			}
		})
	} else {
		return res.json({success: false, info: "Missing username or password!"});
	}
}

loginHandler.register = function (req, res) {
	if(!!req.body.username && !!req.body.password && !!req.body.repassword) {
		return res.json({success: true});
	} else {
		return res.json({success: false, info: "Missing username or password!"});
	}
}

module.exports = loginHandler;