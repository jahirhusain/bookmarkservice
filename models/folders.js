var mongoose = require('mongoose');


var folderSchema = mongoose.Schema({
	foldername: {
		type: String,
		required: true
	},
	created_date: {
		type: Date,
		default: Date.now
	}
}, {collection: 'folder'});

var Folder = module.exports = mongoose.model("Folder", folderSchema);

// add new folder
module.exports.add = function(folder,  callback){
	Folder.create(folder, callback);
}