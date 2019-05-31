var mongoose = require("mongoose");
var connection = require("../config/connection.js");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  // `title` is of type String
  title: String,
  // `body` is of type String
  body: String
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
