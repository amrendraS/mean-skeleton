var dbBridge = require("./dbBridge");
var category = {}

category.getCategory = function(query, cb){
	dbBridge.db.collection("category").findOne(query, function(err, res){
		cb(err, res);
	})
}

category.getCategories = function(query, cb){
	dbBridge.db.collection("category").find(query).toArray(function(err, res){
		cb(err, res);
	})
}

category.create = function(data, cb){
	data.createdAt = new Date();
	data.updatedAt = new Date();
	dbBridge.db.collection("category").insert(data, function(err, res){
		cb(err, res);
	})
}

category.delete = function(query, cb){
	dbBridge.db.collection("category").remove(query, function(err, res){
		cb(err, res);
	})
}

category.inactive = function(query, cb){
	data.updatedAt = new Date();
	dbBridge.db.collection("category").update(query, {$set: {active: false}}, {multi: false}, function(err, res){
		cb(err, res);
	})
}

category.active = function(query, cb){
	data.updatedAt = new Date();
	dbBridge.db.collection("category").update(query, {$set: {active: true}}, {multi: false}, function(err, res){
		cb(err, res);
	})
}

category.update = function(query, data, cb){
	delete data._id;
	data.updatedAt = new Date();
	dbBridge.db.collection("category").update(query, {$set: data}, {multi: false}, function(err, res){
		cb(err, res);
	})
}

module.exports = category;