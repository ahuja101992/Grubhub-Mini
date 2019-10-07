//import the require dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
app.set("view engine", "ejs");

//use cors to allow cross origin resource sharing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

// var Users = [
//   {
//     username: "admin",
//     password: "admin"
//   }
// ];

// var books = [
//   { BookID: "1", Title: "Book 1", Author: "Author 1" },
//   { BookID: "2", Title: "Book 2", Author: "Author 2" },
//   { BookID: "3", Title: "Book 3", Author: "Author 3" }
// ];

//Route to handle Post Request Call
app.post("/calculate", function(req, res) {
  console.log("Inside calculate node function. Req" +req.body);

  console.log("Req Body : ", req.body);
  const operation = req.body.operation.toLowerCase();
  const prevNum = parseFloat(req.body.prevNum);
  const newNum = parseFloat(req.body.newNum);
  let result = 0;
  if (operation === "add") {
    result = prevNum + newNum;
  } else if (operation === "sub") {
    result = prevNum - newNum;
  } else if (operation === "mul") {
    result = prevNum * newNum;
  } else if (operation === "div") {
    result = prevNum / newNum;
  } else {
    result = "invalid operation";
  }
  res.writeHead(200, {
    "Content-Type": "text/plain"
  });
  res.end(JSON.stringify(result));
});

//Route to get All Books when user visits the Home Page
//start your server on port 3010
app.listen(3010);
console.log("Server Listening on port 3010");
