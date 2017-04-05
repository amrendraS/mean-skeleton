var dbBridge   = require("./dbBridge");
var postsQuery = {}

postsQuery.getPost = function(query, cb){
	dbBridge.db.collection("posts").findOne(query, function(err, res){
		cb(err, res);
	})
}

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

postsQuery.delete = function(query, cb){
	dbBridge.db.collection("posts").remove(query, function(err, res){
		cb(err, res);
	})
}

postsQuery.inactive = function(query, cb){
	console.log("query", query)
	dbBridge.db.collection("posts").update(query, {$set: {active: false}}, {multi: false}, function(err, res){
		cb(err, res);
	})
}

postsQuery.active = function(query, cb){
	dbBridge.db.collection("posts").update(query, {$set: {active: true}}, {multi: false}, function(err, res){
		cb(err, res);
	})
}

postsQuery.update = function(query, data, cb){
	console.log(data, 'after')
	delete data._id;
	console.log(data, 'before')
	dbBridge.db.collection("posts").update(query, {$set: data}, {multi: false}, function(err, res){
		cb(err, res);
	})
}

module.exports = postsQuery;