const express = require("express");
const router = express.Router();

const { users } = require("../db");

/* GET /api/v1/users users listing. */
router.get("/", function(req, res, next) {
  users.find({}).exec(function(err, users) {
    if (err) throw err;
    res.json(users);
  });
});

module.exports = router;
