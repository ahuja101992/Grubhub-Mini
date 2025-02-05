var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);

var expect = chai.expect;

it("Should signup a buyer and see if a login id is created or not. return 200 if successful", function(done) {
  chai
    .request("http://127.0.0.1:3010")
    .post("/users/loginbuyer")
    .send({
      username: "chets@gmail.com",
      password: "chets@gmail.com"
    })
    .end(function(err, res) {
      let resp = JSON.parse(res.text);
      expect(resp.result.status).equal(200);
      done();
    });
});
