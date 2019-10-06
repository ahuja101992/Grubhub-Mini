var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);

var expect = chai.expect;

it("Should check credentials and return status code", function(done) {
  chai
    .request("http://127.0.0.1:3010")
    .post("/loginbuyer")
    .send({ username: "namanagrawal@gmail.com", password: "namanagrawal" })
    .end(function(err, res) {
      expect(res).to.have.status(200);
      done();
    });
});
