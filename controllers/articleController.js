var express = require("express");
var axios = require("axios");
var cheerio = require("cheerio");

var app = express();
var db = require("../models");

// scrape npr tech news
app.get("/scrape", function (req, res) {
  axios.get("https://www.npr.org/sections/technology/").then(function (response) {
    var $ = cheerio.load(response.data);

    $("article div").each(function (i, element) {
      var result = {};

      result.title = $(this)
        .children("h2").children("a")
        .text();
      result.link = $(this)
        .children("h2").children("a")
        .attr("href");
      result.teaser = $(this)
        .children("p")
        .text();

      //Create Article Document 
      db.Article.create(result)
        .then(function (dbArticle) {
          console.log(dbArticle);
        })
        .catch(function (err) {
          // If an error occurred, log it
          console.log(err);
        });
    });

    res.send("Scrape Complete");
  });
});

// GET Articles
app.get("/", function (req, res) {
  db.Article.find({})
    .then(function (articles) {
      res.render("index", { articles });
    })
    .catch(function (err) {
      res.json(err);
    });
});

// GET Article by id, including comments
app.get("/articles/:id", function (req, res) {

  db.Article.findOne({ _id: req.params.id })
    .populate("comments")
    .then(function (article) {
      console.log(article);
      res.render("comments", { article });
    })
    .catch(function (err) {
      res.json(err);
    })
});

// POST Comments and update associated Article
app.post("/articles/:id", function (req, res) {

  console.log("reqbody" + req.body);

  db.Comment.create(req.body)
    .then(function (dbComment) {
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: dbComment._id } }, { new: true });
    })
    .then(function (dbArticle) {
      res.json(dbArticle);
    })
    .catch(function (err) {
      res.json(err);
    });
});

//DELETE Comment
app.delete("/comments/:id", function (req, res) {
  db.Comment.deleteOne({ _id: req.params.id })
    .then(function (dbComment) {
      res.json(dbComment);
    })
    .catch(function (err) {
      res.json(err);
    })
});


// DELETE ALL Comments and Articles
app.delete("/", function (req, res) {
  db.Comment.deleteMany({}).then(function (data) {
    db.Article.deleteMany({})
      .then(function (data) {
        res.json(data);
      })
      .catch(function (err) {
        res.json(err);
      })
  });
});


module.exports = app;