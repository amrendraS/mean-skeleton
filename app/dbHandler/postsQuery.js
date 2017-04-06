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
	data.createdAt = new Date();
	data.updatedAt = new Date();
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
	data.updatedAt = new Date();
	dbBridge.db.collection("posts").update(query, {$set: {active: false}}, {multi: false}, function(err, res){
		cb(err, res);
	})
}

postsQuery.active = function(query, cb){
	data.updatedAt = new Date();
	dbBridge.db.collection("posts").update(query, {$set: {active: true}}, {multi: false}, function(err, res){
		cb(err, res);
	})
}

postsQuery.update = function(query, data, cb){
	delete data._id;
	data.updatedAt = new Date();
	dbBridge.db.collection("posts").update(query, {$set: data}, {multi: false}, function(err, res){
		cb(err, res);
	})
}

module.exports = postsQuery;