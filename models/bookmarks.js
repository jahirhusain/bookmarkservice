
var mongoose = require('mongoose');


var linkSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	linkurl: {
		type: String,
		required: true
	},
	foldername: {
		type: String,
		required: true
	},
	created_date: {
		type: Date,
		default: Date.now
	}
}, {collection: 'bookmark'});

var Bookmark = module.exports = mongoose.model("Bookmark", linkSchema);


// DAO Portion starts here

// get all data
module.exports.getall = function(callback, limit){
	Bookmark.find(callback).limit(limit)	
}

// get bookmark
module.exports.get = function(id, callback){
	var query = {"_id": id}
	Bookmark.find(query, callback)
}

// add new bookmark
module.exports.add = function(bookmark,  callback){
	Bookmark.create(bookmark, callback);
	// Folder.add({foldername:bookmark.foldername});
}

// update bookmark
module.exports.update = function(id, bookmark, options, callback) {
	var query = {"_id": id}
	var data = {
		title : bookmark.title,
		linkurl : bookmark.linkurl,
		foldername: bookmark.foldername
	}
	console.log("updating record")
	Bookmark.findOneAndUpdate(query, data, options, callback)
	// Folder.add({foldername:bookmark.foldername});
}

// delete bookmark
module.exports.delete = function(id, callback){
	var query = {"_id": id}
	Bookmark.remove(query, callback)
}

// get bookmark by folder
module.exports.getbyFolder = function(foldername, callback){
	query = {"foldername": foldername}
	Bookmark.find(query, callback)
}

// get folder list
module.exports.getFolders = function(callback, limit){
	Bookmark.collection.distinct("foldername", callback);
}

