var express = require("express");
var router = express.Router();

var { posts } = require("../db");

/* GET /api/v1/posts posts listing. */
router.get("/", function(req, res, next) {
  posts.find({}).exec(function(err, posts) {
    if (err) throw err;
    res.json(posts);
  });
});

module.exports = router;
