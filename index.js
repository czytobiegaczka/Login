const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cookieParser = require('cookie-parser');
const path = require("path");
const { Console } = require("console");

const app = express();
const port = 3000;

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", express.static("./"));

console.log("Hello world");

var tokens = [];
var usernamejs;
var passwordjs;
var connection = mysql.createConnection({
  host: "35.232.102.8",
  user: "root",
  password: "macko",
  database: "trening",
});

app.post("/auth", (req, res) => {
  usernamejs = req.body.username;
  passwordjs = req.body.password;

  connection.connect((err) => {
    if (err) throw err;
    var random_number = losowa_liczba();
    var sql = "SELECT * FROM `users` WHERE username=? and password=?";
    connection.query(sql, [usernamejs, passwordjs], function (
      err,
      result,
      fields
    ) {
      if (err) throw err;
      if (result.length > 0) {
        tokens.push(random_number);
        req.session.loggedin = true;
        res.json({ token: random_number });
      }
   });
  });
});

app.post("/bieg", (req, res) => {});


app.get('/cookie', (req, res) => {
  res.cookie('tescik', "Hello world", { maxAge: 90000000 })
  res.send('cookie set')
})

app.get('/cookieRead', (req, res) => {
  res.send(req.cookies.tescik)
})


app.get("/red:id", (req, res) => {
  //            ^ = req.params.id
  const incoming_token = req.params.id;
  console.log(incoming_token);
  tokens.forEach((token) => {
    if (token == incoming_token) {
      ok = true;
    }
  });
  if (ok) {
    res.sendFile(path.join(__dirname + "/biegi.html"));
  }
  // Porownujemy z wartoscia w tablicy i na tej podstawie wiemy czy zalogowany czy nie
});


//!!!!! UWAGA DO POPRAWY
app.post("/month", (req, res) => {
  var  jaki_rokjs = req.body.rok;
  var jaki_miesiacjs = req.body.miesiac;
  var zakres = jaki_miesiacjs + "." + jaki_rokjs;
  console.log(zakres);

    var sql = "SELECT data,dzien,waga,dystans FROM `ak_miesiac_zawody` WHERE data like '___"+zakres+"'";
    connection.query(sql, function (
      err,
      result,
      fields
    ) {
      if (err) throw err;
      if (result.length > 0) {
        console.log(result);
        res.send(result);
        //res.json(result);
      }
    });
});

app.get("/month", (req, res) => {
  //            ^ = req.params.id
  res.sendFile(path.join(__dirname + "/month.html"));
});

// MOJE FUNKCJE

function losowa_liczba() {
  return Math.floor(Math.random() * 100000) + 1;
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
