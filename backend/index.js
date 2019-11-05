var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var http = require("http").createServer(app);
var io = require("socket.io").listen(3011);
var cors = require("cors");
app.set("view engine", "ejs");
var mysql = require("mysql");
var mongoose = require("mongoose");
// const passport = require("passport");
var passport = require("passport");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw());
app.use(bodyParser.text());

const CONNECTION_URL =
  "mongodb+srv://root:root@grubhub-b4ptc.mongodb.net/grubhub?retryWrites=true&w=majority";

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
//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "http://localhost:3000",
    "http://13.57.249.109:3000"
  );
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

mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true); //issue with a depricated- found it
// mongoose.set("poolSize", 10);
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, poolSize: 10 })
  .then(() => console.log("Connected Successfully to MongoDB"))
  .catch(err => console.error(err));

app.use(passport.initialize());
//imports our configuration file which holds our verification callbacks and things like the secret for signing.
require("../backend/src/config/passport-config")(passport);
// routes
let testRoute = require("./src/routes/test");
let users = require("./src/routes/user");
let profile = require("./src/routes/profile");
let section = require("./src/routes/sections");
let orders = require("./src/routes/orders");
let search = require("./src/routes/search");
let imgUpload = require("./src/routes/imgUpload");
let chat = require("./src/routes/chat");
let chats = require("./src/routes/chats");

app.use("/test", testRoute);
app.use("/users", users);
app.use("/profile", profile);
app.use("/section", section);
app.use("/orders", orders);
app.use("/search", search);
app.use("/image", imgUpload);
app.use("/chats", chats);

//registers our authentication routes with Express.
app.listen(3010, err => {
  if (err) console.error(err);
  console.log("Server Listening on port 3010");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});
io.sockets.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("ns_id", function(ns) {
    console.log("namespace id :" + ns);
    socket.on(ns, message => {
      console.log("message :" + message);
      chat.saveMessage(ns, JSON.parse(message));
      io.emit(ns, message);
    });
  });
});
