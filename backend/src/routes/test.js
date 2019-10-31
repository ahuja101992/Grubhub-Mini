const routes = require("express").Router();
var kafka = require("../kafka/client");

routes.get("/test", (req, res) => {
  console.log("inside testing ");
  res.status(200).json({ message: "Connected!" });
});
routes.post("/book", function(req, res) {
  kafka.make_request("post_book", req.body, function(err, results) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        updatedList: results
      });

      res.end();
    }
  });
});
routes.post("/register", function(req, res) {
  kafka.make_request("profile", { path: "register", body: req.body }, function(
    err,
    results
  ) {
    console.log("in result");
    console.log(results);
    if (err) {
      console.log("Inside err");
      res.json({
        status: "error",
        msg: "System Error, Try Again."
      });
    } else {
      console.log("Inside else");
      res.json({
        result: results
      });

      res.end();
    }
  });
});
module.exports = routes;
