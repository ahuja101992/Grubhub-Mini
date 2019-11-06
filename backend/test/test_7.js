var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);
let should = chai.should();

var expect = chai.expect;

it("NEGETIVE TEST: Should check credentials and return status code 202 if record is not found ", function(done) {
  chai
    .request("http://127.0.0.1:3010")
    .post("/users/loginbuyer")
    .send({
      username: "namanagrawal@gmail.cohkjhjkkjhkjhkjhkjhkjh",
      password: "namanagrawal"
    })
    .end(function(err, res) {
      // console.log("kaka " + res.text);
      let resp = JSON.parse(res.text);
      expect(resp.result.status).equal(202);
      done();
    });
});
