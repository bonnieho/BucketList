// Here's the DB connection.
var mysql = require("mysql");
var connection;

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "H33zy4s!",
    database: "bucket_db"
  });
};

// Connecting the dots - this was used when connecting locally
/*
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

*/

connection.connect();

// Export connection for ORM to use.
module.exports = connection;


