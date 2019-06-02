var mongoose = require("mongoose");
var connection = require("../config/connection.js");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
 comment: {
    type: String,
    required: true
  }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
