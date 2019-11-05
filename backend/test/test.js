var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);

var expect = chai.expect;

it("Should signup a buyer and see if a login id is created or not. return 200 if successful", function(done) {
  chai
    .request("http://127.0.0.1:3010")
    .post("/users/loginbuyer")
    .send({
      f_name: "Ayushman",
      l_name: "Mittal",
      username: "jadkjaksjdkajsdkjas@gmail.com",
      password: "ayushman",
      phone_num: "789456123"
    })
    .end(function(err, res) {
      console.log("kkkkk" + JSON.stringify(res));
      var test = res.text;
      console.log("---------Test :" + JSON.stringify(test));
      expect(res.status).equal(200);
      done();
    });
});
