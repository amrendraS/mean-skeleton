var loginHandler = {};

loginHandler.login = function (req, res) {
	if(!!req.body.username && !!req.body.password) {
		return res.json({success: true});
	} else {
		return res.json({success: false, info: "Missing username or password!"});
	}
}

loginHandler.register = function (req, res) {
	console.log(req.body.body)
	if(!!req.body.username && !!req.body.password && !!req.body.repassword) {
		return res.json({success: true});
	} else {
		return res.json({success: false, info: "Missing username or password!"});
	}
}

module.exports = loginHandler;