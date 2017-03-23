var constants = {};

constants.setGlobals = function (app) {
	app.locals.author = {
		fname: "Amrendra",
		name: "Amrendra Singh",
		website: "amrendrasingh.in",
		year: new Date().getFullYear()
	}
}

constants.database = {
	host: "127.0.0.1",
	port: "27017",
	dbName: "amrendrasingh"
}

// Admin login details
constants.admin = {
	fullName: "Amrendra Singh",
	userName: "amrendra",
	password: "amrendra",
	role: 101
}

module.exports = constants;