var express = require("express");
var app = express();
var cors = require("cors");

Bookmark = require("../models/bookmarks");

app.use(cors());
// app.get("/bookmarks/", function(req, resp){
// 	Bookmark.getall(function(err, linkdata){
// 		if (err) {
// 			throw err;
// 		} 
// 		console.log("getting bookmark for id "+req.params.foldername+ linkdata);

// 		resp.jsonp(linkdata)
// 	});
// });
app.get("/bookmarks/", function(req, resp){
	folderName = req.query.foldername
	console.log("Getting for folder"+folderName)
	Bookmark.getbyFolder(folderName, function(err, linkdata){
		if (err) {
			throw err;
		} 
		console.log("getting bookmark for id "+folderName+ linkdata);

		resp.jsonp(linkdata)
	});
});

app.get("/bookmarks/:_id", function(req, resp){
	var id = req.params._id;
	Bookmark.get(id, function(err, data){
		if (err) {
			resp.status(500).jsonp({"status":"failure", "message": "Unable to get data"})
		} 
		console.log("Getting info")
		resp.status(200).jsonp(data)
	});
});

app.post("/bookmarks", function(req, resp){
	var link = req.body;
	console.log("POST REQUEST RECEIVED")
	Bookmark.add(link, function(err, link){
		if (err) {
			resp.status(500).jsonp({"status":"failure", "message": "Unable to save data"})
		} 

		resp.jsonp(link)
	});
});

app.put("/bookmarks/:_id", function(req, resp){
	var id = req.params._id;
	console.log("updating bookmark")
	var data = req.body;
	Bookmark.update(id, data, {}, function(err, data){
		if (err) {

			resp.status(500).jsonp({"status":"failure", "message": "Unable to Update data"})
		} 
		resp.jsonp(data)
	});
});


app.delete("/bookmarks/:_id", function(req, resp){
	var id = req.params._id;
	Bookmark.delete(id, function(err, data){
		if (err) {
			resp.status(500).jsonp({"status":"failure", "message": "Unable to Delete bookmark"})
		} 
		resp.status(200).jsonp({"status":"success", "message": "Data deleted successfully"})
	});
});

app.get("/folders", function(req, resp){
	Bookmark.getFolders(function(err, linkdata){
		if (err) {
			resp.status(500).jsonp({"status":"failure", "message": "Unable to get data"})
		} 
		resp.status(200).jsonp({"folders":linkdata})
	});
});
module.exports = app;