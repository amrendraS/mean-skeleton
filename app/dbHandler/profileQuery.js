var dbBridge   = require("./dbBridge");
var profileQuery = {}

profileQuery.getProfile = function(query, cb){
	dbBridge.db.collection("profiles").findOne(query, function(err, res){
		cb(err, res);
	})
}

profileQuery.getProfiles = function(query, cb){
	dbBridge.db.collection("profiles").find(query).toArray(function(err, res){
		cb(err, res);
	})
}

profileQuery.create = function(data, cb){
	data.createdAt = new Date();
	data.updatedAt = new Date();
	dbBridge.db.collection("profiles").insert(data, function(err, res){
		cb(err, res);
	})
}

profileQuery.delete = function(query, cb){
	dbBridge.db.collection("profiles").remove(query, function(err, res){
		cb(err, res);
	})
}

profileQuery.inactive = function(query, cb){
	console.log('Profile inactive: ' + JSON.stringify(query));
	dbBridge.db.collection("profiles").update(query, {$set: {active: false, updatedAt: new Date()}}, {multi: false}, function(err, res){
		cb(err, res);
	})
}

profileQuery.active = function(query, cb){
	dbBridge.db.collection("profiles").update(query, {$set: {active: true, updatedAt: new Date()}}, {multi: false}, function(err, res){
		cb(err, res);
	})
}

profileQuery.update = function(query, data, cb){
	delete data._id;
	data.updatedAt = new Date();
	dbBridge.db.collection("profiles").update(query, {$set: data}, {multi: false}, function(err, res){
		cb(err, res);
	})
}

module.exports = profileQuery;