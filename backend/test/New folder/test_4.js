var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);
let should = chai.should();

var expect = chai.expect;

it("Should check get profile based on email id return status code 200 if record is found ", function(done) {
  chai
    .request("http://127.0.0.1:3010")
    .post("/getprofile")
    .send({
      username: "namanagrawal@gmail.com"
    })
    .end(function(err, res) {
      console.log("kaka " + res.text);
      expect(res).to.have.status(200);
      done();
    });
});
