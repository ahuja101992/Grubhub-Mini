var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);

var expect = chai.expect;

it("Should signup a buyer and see if a login id is created or not. return 200 if successful", function(done) {
  chai
    .request("http://127.0.0.1:3010")
    .post("/signupbuy")
    .send({
      f_name: "Ayushman",
      l_name: "Mittal",
      email_id: "ayushman@gmail.com",
      password: "ayushman"
    })
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
});
