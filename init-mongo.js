db.createUser({
  user: "username",
  pwd: "userpass",
  roles: [
    {
      role: "readWrite",
      db: "exampledb"
    }
  ]
});
