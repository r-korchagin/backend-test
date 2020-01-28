const express = require("express");
const router = express.Router();

const { posts } = require("../db");

/* GET /api/v1/join join listing. */
router.get("/", function(req, res, next) {
  posts
    .aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "id",
          as: "userdetails"
        }
      },
      {
        $project: {
          userId: 1,
          id: 1,
          title: 1,
          userdetails: 1
        }
      }
    ])
    .then(function(data) {
      res.json(
        data.map(row => {
          return {
            userId: row.userId,
            id: row.id,
            title: row.title,
            name: row.userdetails[0].name,
            username: row.userdetails[0].username,
            email: row.userdetails[0].email
          };
        })
      );
    });
});

module.exports = router;
