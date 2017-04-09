var categoryQuery   = require("../../dbHandler/categoryQuery");
var ObjectID        = require('mongodb').ObjectID
var categoryHandler = {};

// Get all categories
categoryHandler.getCategories = function (req, res) {
	categoryQuery.getCategories(req.body, function(err, result){
		if(!err && !! result && result.length){
			return res.json({success: true, info: "All category found!", category: result})
		} else {
			return res.json({success: true, info: "No category found!"})
		}
	});
}

categoryHandler.getCategory = function (req, res) {
	if(!req.body._id) {
		return res.json({success: false, info: "Unable to process get category request!"});
	}
	req.body._id = ObjectID(req.body._id);
	categoryQuery.getCategory(req.body, function(err, result){
		if(!err && !! result){
			return res.json({success: true, info: "All category found!", category: result})
		} else {
			return res.json({success: true, info: "No category found!"})
		}
	});
}

// Create a post in database
categoryHandler.create = function (req, res) {
	if(!req.body.name) {
		return res.json({success: false, info: "Category name is required to process request!"});
	}

	categoryQuery.create(req.body, function(err, result){
		if(!err && !! result && result.length){
			return res.json({success: true, info: "All category found!", category: result})
		} else {
			return res.json({success: true, info: "No category found!"})
		}
	});
}

// Edit a post
categoryHandler.edit = function (req, res) {
	if(!req.body.query._id || !req.body.data.name) {
		return res.json({success: false, info: "Category Id and Name is required!"});
	}
	req.body.query._id = ObjectID(req.body.query._id);
	categoryQuery.update(req.body.query, req.body.data, function(err, result){
		if(!err && !! result){
			return res.json({success: true, info: "Category successfully update!", category: result})
		} else {
			return res.json({success: true, info: "No category found!"})
		}
	});
}

// Delete a post
categoryHandler.delete = function (req, res) {
	console.log(req.body)
	if(!req.body._id) {
		return res.json({success: false, info: "Unable to process delete request!"});
	}
	req.body._id = ObjectID(req.body._id);
	categoryQuery.delete(req.body, function(err, result){
		if(!err && !! result && result.length){
			return res.json({success: true, info: "Category has been deleted successfully!", category: result})
		} else {
			return res.json({success: true, info: "No category found!"})
		}
	});
}

// Inactive a post
categoryHandler.inactive = function (req, res) {
	if(!req.body._id) {
		return res.json({success: false, info: "Unable to process inactive request!"});
	}
	req.body._id = ObjectID(req.body._id);
	categoryQuery.inactive(req.body, function(err, result){
		if(!err && !! result && result.length){
			return res.json({success: true, info: "All category found!", category: result})
		} else {
			return res.json({success: true, info: "No category found!"})
		}
	});
}

// Activate a post
categoryHandler.active = function (req, res) {
	if(!req.body._id) {
		return res.json({success: false, info: "Unable to process active request!"});
	}
	req.body._id = ObjectID(req.body._id);
	categoryQuery.active(req.body, function(err, result){
		if(!err && !! result && result.length){
			return res.json({success: true, info: "All category found!", category: result})
		} else {
			return res.json({success: true, info: "No category found!"})
		}
	});
}

module.exports = categoryHandler;