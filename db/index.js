const mongoose = require("mongoose");
const { postsData, usersData } = require("./import");

const { dbHost, dbPort, dbName, dbUser, dbPass } = require("./config");
const dbLink =
  "mongodb://" +
  dbUser +
  ":" +
  dbPass +
  "@" +
  dbHost +
  ":" +
  dbPort +
  "/" +
  dbName;

mongoose.connect(dbLink, { useUnifiedTopology: true, useNewUrlParser: true });

const db = mongoose.connection;

/**
 * Post Schema
 */
const postSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  body: String
});

/**
 * User Schema
 */
const userSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
  username: { type: String },
  email: { type: String },
  address: {
    street: { type: String },
    suite: { type: String },
    city: { type: String },
    zipcode: { type: String },
    geo: {
      lat: { type: String },
      lng: { type: String }
    }
  },
  phone: { type: String },
  website: { type: String },
  company: {
    name: { type: String },
    catchPhrase: { type: String },
    bs: { type: String }
  }
});

/** Posts model */
const posts = mongoose.model("posts", postSchema);
/** Users model */
const users = mongoose.model("users", userSchema);

/** In case connection error */
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("connection to %s is done", dbLink);
  // Import remote data in case connection to DB successful
  importData();
});

/**
 * Import users & posts data to lical MongoDB
 */
async function importData() {
  await posts.deleteMany({});
  let d = await postsData;
  await posts.insertMany(d);

  await users.deleteMany({});
  let u = await usersData;
  await users.insertMany(u);
  console.log("Import successful.", "Open http://localhost:3000");
}

module.exports.db = db;
module.exports.posts = posts;
module.exports.users = users;
