var connection = new require("./kafka/Connection");
//topics files
//var signin = require('./services/signin.js');
var books = require("./services/books.js");
var signin = require("./services/signin");
var search = require("./services/search");
var user = require("./services/user");
var profile = require("./services/profile");
var order = require("./services/orders");
var sections = require("./services/sections");
var imgupload = require("./services/imageUpload");
var chats = require("./services/chats");

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
// var mysql = require("mysql");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const CONNECTION_URL =
  "mongodb+srv://root:root@grubhub-b4ptc.mongodb.net/grubhub?retryWrites=true&w=majority";
var passport = require("passport");
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true); //issue with a depricated- found it
// mongoose.set("poolSize", 10);
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, poolSize: 10 })
  .then(() => console.log("Connected Successfully to MongoDB"))
  .catch(err => console.error(err));

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function(message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);

    fname.handle_request(data.data, function(err, res) {
      console.log("after handle" + JSON.stringify(res));
      var payloads = [
        {
          topic: data.replyTo,
          messages: JSON.stringify({
            correlationId: data.correlationId,
            data: res
          }),
          partition: 0
        }
      ];
      producer.send(payloads, function(err, data) {
        console.log(data);
      });
      return;
    });
  });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("post_book", books);
handleTopicRequest("profile", profile);
handleTopicRequest("user", user);
handleTopicRequest("search", search);
handleTopicRequest("orders", order);
handleTopicRequest("sections", sections);
handleTopicRequest("imgupload", imgupload);
handleTopicRequest("chat", chats);
