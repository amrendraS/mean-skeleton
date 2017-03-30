var dbBridge   = require("./dbBridge");
var postsQuery = {}

postsQuery.getPosts = function(query, cb){
	dbBridge.db.collection("posts").find(query).toArray(function(err, res){
		cb(err, res);
	})
}

postsQuery.create = function(data, cb){
	dbBridge.db.collection("posts").insert(data, function(err, res){
		cb(err, res);
	})
}

module.exports = postsQuery;