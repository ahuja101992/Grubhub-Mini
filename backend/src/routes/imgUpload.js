const express = require("express");
const router = express.Router();
//const upload = require('../../service');
var kafka = require("../kafka/client");
var aws = require("aws-sdk");
var multer = require("multer");
var multerS3 = require("multer-s3");
const uuidv4 = require("uuid/v4");
const path = require("path");
const passport = require("passport");
var requireAuth = passport.authenticate("jwt", { session: false });

var s3 = new aws.S3({
  secretAccessKey: "hD1ebaptlQRMjIMGU9coVtszzX3UuueqUHi0QF1n",
  accessKeyId: "AKIA5L2YCQJCDB3H7DWG",
  region: "us-west-1"
});

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "273-grubhub-images",
    acl: "public-read",
    key: function(req, file, cb) {
      console.log(file);
      const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      console.log(newFilename);
      cb(null, newFilename);
    }
  })
});

// app.post('/upload', upload.array('photos', 3), function (req, res, next) {
//     res.send('Successfully uploaded ' + req.files.length + ' files!')
// })

const singleUpload = upload.single("image");

router.post("/imgupload", (req, res) => {
  console.log("test");
});
router.post("/:email_id/imgupload", requireAuth, singleUpload, (req, res) => {
  console.log("inside image upload");
  kafka.make_request(
    "imgupload",
    { path: "imgupload", file: req.file, params: req.params },
    function(err, results) {
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
          imageUrl: results
        });
        res.end();
      }
    }
  );
  /*const email_id = req.params.email_id;
  console.log("hello test");
  console.log("imgupload req" + req.file.location);
  User.findOneAndUpdate(
    { email_id: req.params.email_id },
    { profile_image: req.file.location }
  )
    .then(user => {
      return res.json({ imageUrl: req.file.location });
    })
    .catch(err => res.status(400).json("Error sending file"));*/
});

router.post(
  "/:email_id/resimgupload",
  requireAuth,
  singleUpload,
  (req, res) => {
    console.log("Inside restaurant image upload");
    kafka.make_request(
      "imgupload",
      { path: "resimgupload", file: req.file, params: req.params },
      function(err, results) {
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
            imageUrl: results
          });
          res.end();
        }
      }
    );
    /*const email_id = req.params.email_id;
  console.log("kkkk" + JSON.stringify(req.params));
  console.log("imgupload req for res " + req.file.location);
  Owner.findOneAndUpdate(
    { email_id: req.params.email_id },
    { profile_image: req.file.location }
  )
    .then(owner => {
      console.log(JSON.stringify(owner));
      return res.json({ imageUrl: req.file.location });
    })
    .catch(err => res.status(400).json("Error sending file"));*/
  }
);

router.post("/dishimgupload", singleUpload, (req, res) => {
  console.log("imgupload req for dish " + req.file.location);
  kafka.make_request(
    "imgupload",
    { path: "dishimgupload", file: req.file, query: req.query },
    function(err, results) {
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
          imageUrl: results
        });
        res.end();
      }
    }
  );
  /*Owner.findOneAndUpdate(
    {
      email_id: req.query.email_id,
      "sections.rest_dish.dish_name": req.query.dishname
    },
    {
      $set: {
        "sections.$[].rest_dish.$[].dish_image": req.file.location
      }
    }
  )
    .then(owner => {
      // console.log(JSON.stringify(owner));
      return res.json({ imageUrl: req.file.location });
    })
    .catch(err => res.status(400).json("Error sending file"));*/
});

module.exports = router;
