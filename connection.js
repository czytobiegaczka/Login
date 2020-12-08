const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "35.188.85.171",
  user: "root",
  password: "macko",
  database: "trening",
});

exports.myConnection = function () {
    return connection;
}