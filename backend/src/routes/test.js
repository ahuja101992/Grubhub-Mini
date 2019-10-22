const routes = require("express").Router();

routes.get("/test", (req, res) => {
  console.log("inside testing ");
  res.status(200).json({ message: "Connected!" });
});

module.exports = routes;
