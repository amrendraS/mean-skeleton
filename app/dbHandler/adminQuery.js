var dbBridge   = require("./dbBridge");
var adminQuery = {}

adminQuery.getAdmin = function(query, cb){
	dbBridge.db.collection("admin").findOne(query, function(err, res){
		cb(err, res);
	})
}

module.exports = adminQuery;