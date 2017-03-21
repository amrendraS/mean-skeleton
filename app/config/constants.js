var constants = {};

constants.setGlobals = function (app) {
	app.locals.author = {
		fname: "Amrendra",
		name: "Amrendra Singh",
		website: "amrendrasingh.in",
		year: new Date().getFullYear()
	}
}

module.exports = constants;