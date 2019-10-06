var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");
var cors = require("cors");
app.set("view engine", "ejs");
var mysql = require("mysql");
const { promisify } = require("util");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var con = mysql.createConnection({
  host: "localhost",
  connectionLimit: 10,
  user: "root",
  password: "root"
});
// var con = mysql.createPool({
//   connectionLimit: 10,
//   host: "localhost",
//   user: "root",
//   password: "root"
// });

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  let q1 =
    'select count(first_name) from grubhub.signup_buyer where email_id= "admin@admin.com" and password="admin"';

  con.query(q1, function(err, result) {
    if (err) throw err;
    //console.log("Result: " + JSON.stringify(result));
  });
});

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

var Users = [
  {
    username: "admin@gmail.com",
    password: "admin"
  }
];
app.use("/login", function(req, res) {
  console.log("testing");
});
app.post("/loginbuyer", function(req, res) {
  console.log("Inside Login Post Request");
  console.log("Req Body : ", req.body);
  let password = req.body.password;
  // let password = req.body.password;
  Users.filter(function(user) {
    let userQuery =
      'select * from grubhub.signup_buyer where email_id= "' +
      req.body.username +
      '"';
    console.log(userQuery);
    con.query(userQuery, function(err, result) {
      if (err) {
        res.writeHead(203, {
          "Content-Type": "text/plain"
        });
        response = {
          authFlag: "false",
          success: "false",
          errMsg: "Database connection Failed"
        };
        console.log(JSON.stringify(result));
        res.end(JSON.stringify(response));
      } else {
        if (result.length > 0) {
          let hash = result[0].password;
          bcrypt.compare(req.body.password, hash, function(err, resu) {
            console.log("returned" + resu);
            if (resu) {
              res.cookie(
                "cookieBuy",
                { email: req.body.email, type: "buyer" },
                {
                  maxAge: 900000,
                  httpOnly: false,
                  path: "/"
                }
              );
              req.session.user = req.body.email;
              res.writeHead(200, {
                "Content-Type": "text/plain"
              });
              console.log("result ::::" + result);
              response = {
                authFlag: "true",
                success: "true",
                errMsg: "Successful Login",
                first_name: result[0].first_name,
                last_name: result[0].last_name,
                email_id: result[0].email_id
              };
              // console.log("result+" + JSON.stringify(response));
              res.end(JSON.stringify(response));
            } else {
              res.writeHead(201, {
                "Content-Type": "text/plain"
              });
              response = {
                authFlag: "false",
                success: "true",
                errMsg: "Username password do not match"
              };
              res.end(JSON.stringify(response));
            }
          });
        } else {
          res.writeHead(201, {
            "Content-Type": "text/plain"
          });
          response = {
            authFlag: "false",
            success: "true",
            errMsg: "Email id not present in the system"
          };
          res.end(JSON.stringify(response));
        }
      }

      console.log("Result: " + JSON.stringify(result));
    });
  });
});

app.post("/signupbuy", function(req, res) {
  console.log("Inside signup Post Request");
  let password = req.body.password;
  console.log("Req Body : ", password);
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      let insertQuery =
        'insert into grubhub.signup_buyer (first_name, last_name, email_id, password) values ("' +
        req.body.f_name +
        '","' +
        req.body.l_name +
        '","' +
        req.body.email_id +
        '","' +
        hash +
        '")';
      console.log(insertQuery);
      con.query(insertQuery, function(err, result) {
        if (err) {
          // console.log("in this::::::::");
          res.writeHead(202, {
            "Content-Type": "text/plain"
          });
          response = {
            success: "false",
            errMsg: "An error occured, an account with same id exists. "
          };
          // console.log("result+" + JSON.stringify(response));
          res.end(JSON.stringify(response));
        } else {
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          console.log("result ::::" + result);
          response = {
            success: "true",
            errMsg: "Successfully inserted into database."
          };
          // console.log("result+" + JSON.stringify(response));
          res.end(JSON.stringify(response));
        }
      });
    });
  });
});

app.post("/loginrest", function(req, res) {
  console.log("Inside rest Login Post Request");
  console.log("Req Body : ", req.body);
  let password = req.body.password;
  Users.filter(function(user) {
    let userQuery =
      'select * from grubhub.signup_owner where email_id= "' +
      req.body.username +
      '"';
    console.log(userQuery);
    con.query(userQuery, function(err, result) {
      if (err) {
        res.writeHead(203, {
          "Content-Type": "text/plain"
        });
        response = {
          authFlag: "false",
          success: "false",
          errMsg: "Database connection Failed"
        };
        res.end(JSON.stringify(response));
      } else {
        if (result.length > 0) {
          let hash = result[0].password;
          console.log(hash);
          bcrypt.compare(password, hash, function(err, resu) {
            if (err) {
              res.writeHead(209, {
                "Content-Type": "text/plain"
              });
              response = {
                authFlag: "false",
                success: "false",
                errMsg: "Error hashing."
              };
              res.end(JSON.stringify(response));
            }
            if (resu) {
              res.cookie(
                "cookieRes",
                { email: req.body.email, type: "rest" },
                {
                  maxAge: 900000,
                  httpOnly: false,
                  path: "/"
                }
              );
              req.session.user = req.body.email;
              res.writeHead(208, {
                "Content-Type": "text/plain"
              });
              response = {
                authFlag: "true",
                success: "true",
                errMsg: "Successful Login",
                first_name: result[0].first_name,
                last_name: result[0].last_name,
                email_id: result[0].email_id
              };
              res.end(JSON.stringify(response));
            } else {
              res.writeHead(209, {
                "Content-Type": "text/plain"
              });
              response = {
                authFlag: "false",
                success: "false",
                errMsg: "Username password incorrect."
              };
              res.end(JSON.stringify(response));
            }
          });
        } else {
          res.writeHead(201, {
            "Content-Type": "text/plain"
          });
          response = {
            authFlag: "false",
            success: "true",
            errMsg: "Email id not present in the system"
          };
          res.end(JSON.stringify(response));
        }
      }
    });
  });
});

app.post("/signuprest", function(req, res) {
  console.log("Inside signup Post Request");
  console.log("Req Body : ", req.body);
  let password = req.body.email[0];
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
      if (err) {
        res.writeHead(202, {
          "Content-Type": "text/plain"
        });
        response = {
          success: "false",
          errMsg: "Error hashing "
        };
        // console.log("result+" + JSON.stringify(response));
        res.end(JSON.stringify(response));
      }
      let insertQuery =
        'insert into grubhub.signup_owner (first_name, last_name, email_id, resturant_name, resturant_zipcode, password, phone_num) values ("' +
        req.body.f_name +
        '","' +
        req.body.l_name +
        '","' +
        req.body.email +
        '","' +
        req.body.rest_name +
        '","' +
        req.body.rest_zip +
        '","' +
        hash +
        '","' +
        req.body.phone +
        '")';
      console.log(insertQuery);
      con.query(insertQuery, function(err, result) {
        if (err) {
          res.writeHead(205, {
            "Content-Type": "text/plain"
          });
          response = {
            success: "false",
            errMsg: "Database connection Failed"
          };

          res.end(JSON.stringify(response));
        } else {
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          console.log("result ::::" + result);
          response = {
            success: "true",
            errMsg:
              "Successfully inserted into database. Your password is your email address"
          };
          // console.log("result+" + JSON.stringify(response));
          res.end(JSON.stringify(response));
        }
      });
    });
  });
});

app.post("/getprofile", function(req, res) {
  console.log("Inside rest get profile Post Request");
  console.log("Req Body : ", req.body);
  Users.filter(function(user) {
    let profileQuery =
      'select * from grubhub.signup_buyer where email_id= "' +
      req.body.email_id +
      '"';
    console.log(profileQuery);
    con.query(profileQuery, function(err, result) {
      if (err) {
        res.writeHead(203, {
          "Content-Type": "text/plain"
        });
        response = {
          success: "false",
          errMsg: "Database connection Failed"
        };
      } else {
        if (result.length > 0) {
          req.session.user = req.body.email;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          response = {
            first_name: result[0].first_name,
            last_name: result[0].last_name,
            email_id: result[0].email_id,
            phone_num: result[0].phone_num,

            success: "true",
            errMsg: ""
          };
          res.end(JSON.stringify(response));
        } else {
          res.writeHead(209, {
            "Content-Type": "text/plain"
          });
          response = {
            success: "false",
            errMsg: "incorrect Input."
          };
          res.end(JSON.stringify(response));
        }
      }
    });
  });
});

app.post("/updateprofile", function(req, res) {
  console.log("Inside rest Login Post Request");
  console.log("Req Body : ", req.body);
  Users.filter(function(user) {
    let userQuery =
      'select * from grubhub.signup_buyer where email_id= "' +
      req.body.email_id +
      '"';
    console.log(userQuery);
    con.query(userQuery, function(err, result) {
      if (err) {
        res.writeHead(203, {
          "Content-Type": "text/plain"
        });
        response = {
          success: "false",
          errMsg: "Database connection Failed"
        };
        res.end(JSON.stringify(response));
      } else {
        if (result.length > 0) {
          let password = req.body.password;
          bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
              if (err) {
                res.writeHead(203, {
                  "Content-Type": "text/plain"
                });
                response = {
                  success: "false",
                  errMsg: "Erroring hashing password"
                };
                res.end(JSON.stringify(response));
              }
              let updateQuery =
                'update grubhub.signup_buyer set first_name= "' +
                req.body.first_name +
                '" , last_name="' +
                req.body.last_name +
                '" , password = "' +
                hash +
                '" , phone_num = "' +
                req.body.phone_num +
                '" where email_id= "' +
                req.body.email_id +
                '"';
              console.log(updateQuery);
              con.query(updateQuery, function(err1, result1) {
                if (err1) {
                  res.writeHead(203, {
                    "Content-Type": "text/plain"
                  });
                  response = {
                    success: "false",
                    errMsg: "Database connection Failed"
                  };
                  res.end(JSON.stringify(response));
                }
              });
              res.writeHead(200, {
                "Content-Type": "text/plain"
              });
              response = {
                success: "true",
                errMsg: "updated successfully ",
                first_name: result[0].first_name,
                last_name: result[0].last_name
              };
              res.end(JSON.stringify(response));
            });
          });
        } else {
          res.writeHead(209, {
            "Content-Type": "text/plain"
          });
          response = {
            success: "false",
            errMsg: "Error featching records."
          };
          res.end(JSON.stringify(response));
        }
      }
    });
  });
});

app.post("/getresprofile", function(req, res) {
  console.log("Inside rest get profile Post Request");
  console.log("Req Body : ", req.body);
  Users.filter(function(user) {
    let profileQuery =
      'select * from grubhub.signup_owner where email_id= "' +
      req.body.email_id +
      '"';
    console.log(profileQuery);
    con.query(profileQuery, function(err, result) {
      if (err) {
        res.writeHead(203, {
          "Content-Type": "text/plain"
        });
        response = {
          success: "false",
          errMsg: "Database connection Failed"
        };
      } else {
        if (result.length > 0) {
          req.session.user = req.body.email;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          response = {
            first_name: result[0].first_name,
            last_name: result[0].last_name,
            email_id: result[0].email_id,
            phone_num: result[0].phone_num,
            resturant_name: result[0].resturant_name,
            resturant_zipcode: result[0].resturant_zipcode,
            cuisine: result[0].cuisine,
            success: "true",
            errMsg: ""
          };
          res.end(JSON.stringify(response));
        } else {
          res.writeHead(209, {
            "Content-Type": "text/plain"
          });
          response = {
            success: "false",
            errMsg: "incorrect Input."
          };
          res.end(JSON.stringify(response));
        }
      }
    });
  });
});

app.post("/updateresprofile", function(req, res) {
  console.log("Inside rest update Post Request");
  console.log("Req Body : ", req.body);
  Users.filter(function(user) {
    let userQuery =
      'select * from grubhub.signup_owner where email_id= "' +
      req.body.email_id +
      '"';
    console.log(userQuery);
    con.query(userQuery, function(err, result) {
      if (err) {
        res.writeHead(203, {
          "Content-Type": "text/plain"
        });
        response = {
          success: "false",
          errMsg: "Database connection Failed"
        };
        res.end(JSON.stringify(response));
      } else {
        if (result.length > 0) {
          let password = req.body.password;
          bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
              if (err) {
                res.writeHead(203, {
                  "Content-Type": "text/plain"
                });
                response = {
                  success: "false",
                  errMsg: "Erroring hashing password"
                };
                res.end(JSON.stringify(response));
              } else {
                let updateQuery =
                  'update grubhub.signup_owner set first_name= "' +
                  req.body.first_name +
                  '" , last_name="' +
                  req.body.last_name +
                  '" , password = "' +
                  hash +
                  '" , resturant_name = "' +
                  req.body.rest_name +
                  '" , resturant_zipcode = "' +
                  req.body.rest_zip +
                  '" , phone_num = "' +
                  req.body.phone_num +
                  '" where email_id= "' +
                  req.body.email_id +
                  '"';
                console.log(updateQuery);
                con.query(updateQuery, function(err1, result1) {
                  if (err1) {
                    res.writeHead(203, {
                      "Content-Type": "text/plain"
                    });
                    response = {
                      success: "false",
                      errMsg: "Database connection Failed"
                    };
                    res.end(JSON.stringify(response));
                  }
                });
                res.writeHead(208, {
                  "Content-Type": "text/plain"
                });
                response = {
                  success: "true",
                  errMsg: "updated successfully ",
                  first_name: result[0].first_name,
                  last_name: result[0].last_name
                };
                res.end(JSON.stringify(response));
              }
            });
          });
        } else {
          res.writeHead(209, {
            "Content-Type": "text/plain"
          });
          response = {
            success: "false",
            errMsg: "Error Featcing records"
          };
          res.end(JSON.stringify(response));
        }
      }
    });
  });
});

app.post("/insertdish", function(req, res) {
  console.log("Inside restaurant insert dish request");
  console.log("Req Body : ", req.body);
  Users.filter(function(user) {
    let typeid = 5;
    let rettname =
      'select * from grubhub.signup_owner where email_id= "' +
      req.body.email_id +
      '"';
    console.log(rettname);
    con.query(rettname, function(err, result) {
      if (err) {
        res.writeHead(203, {
          "Content-Type": "text/plain"
        });
        response = {
          success: "false",
          errMsg: "Database connection Failed"
        };
        res.end(JSON.stringify(response));
      } else {
        if (result.length > 0) {
          let rest_id = result[0].restaurant_id;
          let getdishid =
            'select * from grubhub.dish_type where TYPE_NAME= "' +
            req.body.type +
            '"';
          console.log(" getdishid " + getdishid);
          con.query(getdishid, function(err2, result2) {
            if (err2) {
              res.writeHead(203, {
                "Content-Type": "text/plain"
              });
              response = {
                success: "false",
                errMsg: "Database connection Failed"
              };
              res.end(JSON.stringify(response));
            } else {
              console.log("result 2  " + JSON.stringify(result2));
              typeid = result2[0].TYPE_ID;
              let insertQuery =
                'insert into grubhub.rest_dish (DISH_NAME, DISH_DESC, DISH_PRICE, TYPE, REST_ID, TYPE_ID) values ("' +
                req.body.dish_name +
                '","' +
                req.body.dish_desc +
                '","' +
                req.body.dish_price +
                '","' +
                req.body.type +
                '",' +
                rest_id +
                "," +
                typeid +
                ")";
              console.log(insertQuery);
              con.query(insertQuery, function(err1, result1) {
                if (err1) {
                  res.writeHead(203, {
                    "Content-Type": "text/plain"
                  });
                  response = {
                    success: "false",
                    errMsg: "Error inserting Record"
                  };
                  res.end(JSON.stringify(response));
                } else {
                  res.writeHead(200, {
                    "Content-Type": "text/plain"
                  });
                  response = {
                    dishSuccess: "true",
                    success: "true",
                    errMsg: "Dish Inserted successfully"
                  };
                  res.end(JSON.stringify(response));
                }
              });
            }
          });
        } else {
          res.writeHead(209, {
            "Content-Type": "text/plain"
          });
          response = {
            success: "false",
            dishSuccess: "false",
            errMsg: "Rest Id not found"
          };
          res.end(JSON.stringify(response));
        }
      }
    });
  });
});

app.post("/deletedish", function(req, res) {
  console.log("Inside restaurant delete dish request");
  console.log("Req Body : ", req.body);
  Users.filter(function(user) {
    let deletequery =
      "delete from grubhub.rest_dish where DISH_ID= " + req.body.dish_id;
    console.log(deletequery);
    con.query(deletequery, function(err, result) {
      if (err) {
        res.writeHead(203, {
          "Content-Type": "text/plain"
        });
        response = {
          success: "false",
          errMsg: "Database connection Failed",
          err: err.sqlMessage
        };
        res.end(JSON.stringify(response));
      } else {
        if (result.affectedRows) {
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          response = {
            success: "true",
            delSuccess: "true",
            errMsg: "Dish deleted",
            result: result
          };
        } else {
          res.writeHead(203, {
            "Content-Type": "text/plain"
          });
          response = {
            success: "true",
            delSuccess: "false",
            errMsg: "no record found",
            result: result
          };
        }
        res.end(JSON.stringify(response));
      }
    });
  });
});

app.post("/getdishes", function(req, res) {
  console.log("Inside restaurant get dish request");
  console.log("Req Body : ", req.body);
  let restname =
    'select * from grubhub.signup_owner where email_id= "' +
    req.body.email_id +
    '"';
  console.log(restname);
  con.query(restname, function(err, result) {
    if (err) {
      res.writeHead(203, {
        "Content-Type": "text/plain"
      });
      response = {
        success: "false",
        errMsg: "Database connection Failed"
      };
      res.end(JSON.stringify(response));
    } else {
      let rest_id = result[0].restaurant_id;
      let getquery =
        "select * from grubhub.rest_dish where REST_ID= " +
        rest_id +
        " order by type asc";
      console.log(getquery);
      con.query(getquery, function(err1, result1) {
        if (err) {
          res.writeHead(203, {
            "Content-Type": "text/plain"
          });
          response = {
            success: "false",
            errMsg: "Database connection Failed"
          };
          res.end(JSON.stringify(response));
        } else {
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          response = {
            success: "true",
            getSuccess: "true",
            errMsg: "",
            dishes: result1
          };
          res.end(JSON.stringify(response));
        }
      });
    }
  });
});
app.post("/getbuydishes", function(req, res) {
  console.log("Inside buyer get dish request");
  console.log("Req Body : ", req.body);
  let getquery =
    "select * from grubhub.rest_dish where REST_ID= " +
    req.body.rest_id +
    " order by type asc";
  console.log(getquery);
  con.query(getquery, function(err, result) {
    if (err) {
      res.writeHead(203, {
        "Content-Type": "text/plain"
      });
      response = {
        success: "false",
        errMsg: "Database connection Failed",
        err: err.sqlMessage
      };
      res.end(JSON.stringify(response));
    } else {
      if (result.length > 0) {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        response = {
          success: "true",
          getSuccess: "true",
          errMsg: "",
          result: result
        };
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        response = {
          success: "true",
          getSuccess: "false",
          errMsg: "Resturant id not found",
          result: result
        };
      }
      res.end(JSON.stringify(response));
    }
  });
});

let queryDbSync = async function(query) {
  let promisifyConnection = promisify(connection.query).bind(connection);
  return await promisifyConnection(qurey);
};
app.post("/insertorder", function(req, res) {
  console.log("Inside restaurant insert order request");
  console.log("Req Body : ", req.body);
  let rest_id = req.body.rest_email_id;
  let buyname =
    'select * from grubhub.signup_buyer where email_id= "' +
    req.body.buy_email_id +
    '"';
  console.log(buyname);
  con.query(buyname, function(err1, result2) {
    if (err1) {
      res.writeHead(203, {
        "Content-Type": "text/plain"
      });
      response = {
        success: "false",
        errMsg: "Database connection Failed"
      };
      res.end(JSON.stringify(response));
    } else {
      let buyer_id = result2[0].buyer_id;
      console.log(buyer_id + " " + rest_id);
      let insertQuery =
        "insert into grubhub.order (ORDER_NUM,ORDER_TIME, BUYER_ID,REST_ID, STATUS, TOTAL_PRICE ) values (uuid(), NOW(), " +
        buyer_id +
        "," +
        rest_id +
        ',"' +
        req.body.status +
        '",' +
        req.body.total_price +
        ")";
      console.log(insertQuery);

      con.query(insertQuery, function(err2, result2) {
        if (err2) {
          res.writeHead(203, {
            "Content-Type": "text/plain"
          });
          response = {
            success: "false",
            errMsg: "Error inserting record"
          };
          res.end(JSON.stringify(response));
        } else {
          if (result2.affectedRows > 0) {
            let getId = "SELECT LAST_INSERT_ID() AS id_value";
            con.query(getId, function(err3, result3) {
              if (err3) {
                res.writeHead(203, {
                  "Content-Type": "text/plain"
                });
                response = {
                  success: "false",
                  errMsg: "Error inserting record"
                };
                res.end(JSON.stringify(response));
              } else {
                let order_id = result3[0].id_value;
                console.log("order_id" + order_id);
                let data = req.body.items;
                for (let i = 0; i < data.length; i++) {
                  let dish_name = "",
                    dish_price = 0;
                  let getDishQuery =
                    "select * from grubhub.rest_dish where dish_id=" +
                    data[i].dish_id;
                  console.log("     " + getDishQuery);
                  con.query(getDishQuery, function(err4, result4) {
                    if (err4) {
                      console.log("broken");
                      return false;
                    } else {
                      dish_name = result4[0].DISH_NAME;
                      dish_price = result4[0].DISH_PRICE;
                      console.log("           " + JSON.stringify(result4[0]));
                      console.log("           " + dish_name);
                      let insertQuery =
                        "insert into grubhub.order_item (ORDER_ID, DISH_NAME,PRICE, DISH_ID, QUANTITY) values (" +
                        order_id +
                        ",'" +
                        dish_name +
                        "'," +
                        dish_price +
                        "," +
                        data[i].dish_id +
                        "," +
                        data[i].count +
                        ")";
                      console.log(insertQuery);
                      con.query(insertQuery, function(err5, result5) {
                        if (err5) {
                          res.writeHead(203, {
                            "Content-Type": "text/plain"
                          });
                          response = {
                            success: "false",
                            errMsg: "Error inserting record",
                            err: err5.sqlMessage
                          };
                          res.end(JSON.stringify(response));
                        } else {
                          response = {
                            success: "true",
                            orderSuccess: "true",
                            errMsg: "Order inserted successfully",
                            result: result5
                          };
                          res.end(JSON.stringify(response));
                        }
                      });
                    }
                  });
                }
              }
            });
          }
        }
      });
    }
  });
});

app.post("/searchrest", function(req, res) {
  console.log("Inside restaurant search ");
  console.log("Req Body : ", req.body);
  Users.filter(function(user) {
    let searchQuery =
      "select resturant_name, cuisine, resturant_zipcode,restaurant_id  from grubhub.signup_owner o where o.resturant_zipcode =" +
      req.body.rest_zip +
      ' and restaurant_id in(select distinct(rest_id) from grubhub.rest_dish where dish_name like "%' +
      req.body.dish_name +
      '%")';
    console.log(searchQuery);
    con.query(searchQuery, function(err, result) {
      if (err) {
        res.writeHead(203, {
          "Content-Type": "text/plain"
        });
        response = {
          success: "false",
          errMsg: "Database connection Failed"
        };
        res.end(JSON.stringify(response));
      }
      res.writeHead(200, {
        "Content-Type": "text/plain"
      });
      response = {
        success: "true",
        getRest: "true",
        errMsg: "",
        restaurants: result
      };
      res.end(JSON.stringify(response));
    });
  });
});

app.post("/getcurrorders", function(req, res) {
  console.log("Inside get orders request");
  console.log("Req Body : ", req.body);

  let buyname =
    'select * from grubhub.signup_buyer where email_id= "' +
    req.body.email_id +
    '"';

  // console.log(buyname);
  // let pastOrders = "SELECT * FROM grubhub.order where ORDER_TIME <= CURDATE()";
  con.query(buyname, function(err, result) {
    if (err) {
      res.writeHead(203, {
        "Content-Type": "text/plain"
      });
      response = {
        success: "false",
        errMsg: "Database connection Failed"
      };
      res.end(JSON.stringify(response));
    } else {
      let buyer_id = result[0].buyer_id;
      let currentOrders =
        "SELECT o.ORDER_ID,o.ORDER_NUM, o.STATUS, o.TOTAL_PRICE, ow.resturant_name, ow.resturant_zipcode  FROM grubhub.order o, grubhub.signup_owner ow where o.ORDER_TIME >= CURDATE() and ow.restaurant_id= o.rest_id and o.BUYER_ID =" +
        buyer_id;
      // console.log(currentOrders);
      con.query(currentOrders, function(err1, result1) {
        if (err1) {
          res.writeHead(203, {
            "Content-Type": "text/plain"
          });
          response = {
            success: "false",
            getSuccess: "false",
            errMsg: "Database connection Failed",
            err: err.sqlMessage
          };
          res.end(JSON.stringify(response));
        } else {
          if (result1.length > 0) {
            res.writeHead(203, {
              "Content-Type": "text/plain"
            });
            response = {
              success: "True",
              errMsg: "Success",
              getSuccess: "true",
              result: result1
            };
            res.end(JSON.stringify(response));
          } else {
            res.writeHead(200, {
              "Content-Type": "text/plain"
            });
            response = {
              success: "true",
              getSuccess: "false",
              errMsg: "Error Featching records",
              result: result1
            };
            res.end(JSON.stringify(response));
          }
        }
      });
    }
  });
});

app.post("/getpastorders", function(req, res) {
  console.log("Inside get past orders request");
  console.log("Req Body : ", req.body);

  let buyname =
    'select * from grubhub.signup_buyer where email_id= "' +
    req.body.email_id +
    '"';

  // console.log(buyname);
  // let pastOrders = "SELECT * FROM grubhub.order where ORDER_TIME <= CURDATE()";
  con.query(buyname, function(err, result) {
    if (err) {
      res.writeHead(203, {
        "Content-Type": "text/plain"
      });
      response = {
        success: "false",
        errMsg: "Database connection Failed"
      };
      res.end(JSON.stringify(response));
    } else {
      let buyer_id = result[0].buyer_id;
      let pastOrders =
        "SELECT o.ORDER_ID,o.ORDER_NUM, o.STATUS, o.TOTAL_PRICE, ow.resturant_name, ow.resturant_zipcode  FROM grubhub.order o, grubhub.signup_owner ow where o.ORDER_TIME <= CURDATE() and ow.restaurant_id= o.rest_id and o.BUYER_ID =" +
        buyer_id;
      // console.log(pastOrders);
      con.query(pastOrders, function(err1, result1) {
        if (err1) {
          res.writeHead(203, {
            "Content-Type": "text/plain"
          });
          response = {
            success: "false",
            getSuccess: "false",
            errMsg: "Database connection Failed",
            err: err.sqlMessage
          };
          res.end(JSON.stringify(response));
        } else {
          if (result1.length > 0) {
            res.writeHead(203, {
              "Content-Type": "text/plain"
            });
            response = {
              success: "True",
              errMsg: "Success",
              getSuccess: "true",
              result: result1
            };
            res.end(JSON.stringify(response));
          } else {
            res.writeHead(200, {
              "Content-Type": "text/plain"
            });
            response = {
              success: "true",
              getSuccess: "false",
              errMsg: "Error Featching records",
              result: result1
            };
            res.end(JSON.stringify(response));
          }
        }
      });
    }
  });
});

app.post("/getsections", function(req, res) {
  let getquery = "select distinct(TYPE) from grubhub.rest_dish";
  con.query(getquery, function(err, result) {
    if (err) {
      res.writeHead(203, {
        "Content-Type": "text/plain"
      });
      response = {
        success: "false",
        errMsg: "Database connection Failed",
        err: err.sqlMessage
      };
      res.end(JSON.stringify(response));
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain"
      });
      response = {
        success: "true",
        getSuccess: "true",
        errMsg: "",
        sections: result
      };
      res.end(JSON.stringify(response));
    }
  });
});

app.post("/getcurrentDish", function(req, res) {
  let getquery =
    "select * from grubhub.rest_dish where DISH_ID= " + req.body.dish_id;
  con.query(getquery, function(err, result) {
    if (err) {
      res.writeHead(203, {
        "Content-Type": "text/plain"
      });
      response = {
        success: "false",
        errMsg: "Database connection Failed",
        err: err.sqlMessage
      };
      res.end(JSON.stringify(response));
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain"
      });
      response = {
        success: "true",
        getSuccess: "true",
        errMsg: "",
        dishDetails: result[0]
      };
      res.end(JSON.stringify(response));
    }
  });
});

app.post("/updatedish", function(req, res) {
  let updatequery =
    "update grubhub.rest_dish set DISH_NAME= '" +
    req.body.dish_name +
    "' , DISH_NAME = '" +
    req.body.dish_desc +
    "' , DISH_PRICE = " +
    req.body.dish_price +
    " where DISH_ID = " +
    req.body.dish_id;
  console.log(updatequery);
  con.query(updatequery, function(err, result) {
    if (err) {
      res.writeHead(203, {
        "Content-Type": "text/plain"
      });
      response = {
        success: "false",
        errMsg: "Database connection Failed",
        err: err.sqlMessage
      };
      res.end(JSON.stringify(response));
    } else {
      if (result.affectedRows > 0) {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        response = {
          success: "true",
          getSuccess: "true",
          errMsg: "",
          result: result
        };
        res.end(JSON.stringify(response));
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        response = {
          success: "false",
          getSuccess: "false",
          errMsg: "Error executing query",
          result: result
        };
        res.end(JSON.stringify(response));
      }
    }
  });
});

app.post("/updateorstatus", function(req, res) {
  let updateordquery =
    "update grubhub.order set STATUS= '" +
    req.body.order_status +
    "' where ORDER_ID = " +
    req.body.order_id;
  console.log(updateordquery);
  con.query(updateordquery, function(err, result) {
    if (err) {
      res.writeHead(203, {
        "Content-Type": "text/plain"
      });
      response = {
        success: "false",
        errMsg: "Database connection Failed",
        err: err.sqlMessage
      };
      res.end(JSON.stringify(response));
    } else {
      if (result.affectedRows > 0) {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        response = {
          success: "true",
          updateSuccess: "true",
          errMsg: "",
          result: result
        };
        res.end(JSON.stringify(response));
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        response = {
          success: "true",
          updateSuccess: "false",
          errMsg: "No record found",
          result: result
        };
        res.end(JSON.stringify(response));
      }
    }
  });
});

//////to be done+

app.post("/getrescurrorders", function(req, res) {
  console.log("Inside get orders request- res");
  console.log("Req Body : ", req.body);

  let currentOrd =
    'SELECT o.TOTAL_PRICE,b.first_name, b.last_name, o.ORDER_ID, o.ORDER_NUM,o.STATUS,a.house_num, a.ADDR_1, a.ADDR_2, a.CITY, a.STATE,a.ZIPCODE FROM grubhub.order o, grubhub.signup_buyer b, grubhub.address a , grubhub.signup_owner ow where ow.email_id="' +
    req.body.email_id +
    '" and o.STATUS!= "Delivered" and o.BUYER_ID=b.buyer_id and b.ADDR_ID = a.ADDRESS_ID and o.REST_ID=OW.restaurant_id';
  console.log(currentOrd);
  con.query(currentOrd, function(err, result) {
    if (err) {
      res.writeHead(203, {
        "Content-Type": "text/plain"
      });
      response = {
        success: "false",
        errMsg: "Database connection Failed",
        err: err.sqlMessage
      };
      res.end(JSON.stringify(response));
    } else {
      if (result.length > 0) {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        response = {
          success: "true",
          getSuccess: "true",
          errMsg: "",
          result: result
        };
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        response = {
          success: "true",
          getSuccess: "false",
          errMsg: "Error Featching records",
          result: result
        };
      }
      res.end(JSON.stringify(response));
    }
  });
});
app.post("/getrespastorders", function(req, res) {
  console.log("Inside get orders request- res");
  console.log("Req Body : ", req.body);

  let currentOrd =
    'SELECT o.TOTAL_PRICE,b.first_name, b.last_name, o.ORDER_ID, o.ORDER_NUM,o.STATUS,a.house_num, a.ADDR_1, a.ADDR_2, a.CITY, a.STATE,a.ZIPCODE FROM grubhub.order o, grubhub.signup_buyer b, grubhub.address a , grubhub.signup_owner ow where ow.email_id="' +
    req.body.email_id +
    '" and o.STATUS= "Delivered" and o.BUYER_ID=b.buyer_id and b.ADDR_ID = a.ADDRESS_ID and o.REST_ID=OW.restaurant_id';
  console.log(currentOrd);
  con.query(currentOrd, function(err, result) {
    if (err) {
      res.writeHead(203, {
        "Content-Type": "text/plain"
      });
      response = {
        success: "false",
        errMsg: "Database connection Failed",
        err: err.sqlMessage
      };
      res.end(JSON.stringify(response));
    } else {
      if (result.length > 0) {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        response = {
          success: "true",
          getSuccess: "true",
          errMsg: "",
          result: result
        };
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        response = {
          success: "true",
          getSuccess: "false",
          errMsg: "Error Featching records",
          result: result
        };
      }
      res.end(JSON.stringify(response));
    }
  });
});

app.post("/getorditems", function(req, res) {
  console.log("Inside get orders items - res");
  console.log("Req Body : ", req.body);

  let getItems =
    "select * from grubhub.order_item where ORDER_ID=" + req.body.ORDER_ID;
  console.log(getItems);
  con.query(getItems, function(err, result) {
    if (err) {
      res.writeHead(203, {
        "Content-Type": "text/plain"
      });
      response = {
        success: "false",
        errMsg: "Database connection Failed",
        err: err.sqlMessage
      };
      res.end(JSON.stringify(response));
    } else {
      if (result.length > 0) {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        response = {
          success: "true",
          getSuccess: "true",
          errMsg: "",
          result: result
        };
      } else {
        res.writeHead(200, {
          "Content-Type": "text/plain"
        });
        response = {
          success: "true",
          getSuccess: "false",
          errMsg: "No items for the current order",
          result: result
        };
      }
      res.end(JSON.stringify(response));
    }
  });
});

//start your server on port 3010
app.listen(3010);
console.log("Server Listening on port 3010");
