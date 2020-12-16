// tworzy pulę połaczeń z bazą 
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "35.188.85.171",
    user: "root",
    password: "macko",
    database: "trening",
});

module.exports = pool;