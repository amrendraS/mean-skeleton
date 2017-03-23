var mongodb 		= require('mongodb'),
		config      = require('../config/constants'),
		MongoClient = mongodb.MongoClient;

var connectionUrl = 'mongodb://' + config.database.host + ':' + config.database.port + '/' + config.database.dbName;		
var dbBridge     = {};
var db            = "";

exports.createConnection = function(){
	MongoClient.connect(connectionUrl, function(err, database) {
		if(err){
			console.log(err);
			console.log("unable to connect Mongodb database on host: " + config.database.host  + " port: " + config.database.port)
		} else{
			db = database;
			exports.db = database;
			console.log("Mongodb database connected to server on host: " + config.database.host  + " port: " + config.database.port);			
		}
	});
}

// Create super admin for the first time
exports.createAdmin = function(){
	db.collection('admin').findOne({role: 101}, function(err, result){
		if(!err && result) {
			console.log('Super admin already exists!');
		} else {
			console.log('Creating super admin here!');
			db.collection('admin').insert({username: constants.admin.userName, password: constants.admin.password, role: constants.admin.role, createdAt: new Date(), fullName: constants.admin.fullName}, function(err, result){
				if(!err && result) {
					console.log('Super admin has been created successfully!');
				} else {
					console.error('Error while creating super admin: ' + JSON.stringify(err));
				}
			})
		}
	})
}