var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);
let should = chai.should();

var expect = chai.expect;

it("Should check get restaurant profile based on email id return status code 200 if record is found ", function(done) {
  chai
    .request("http://127.0.0.1:3010")
    .post("/profile/getresprofile")
    .send({
      email_id: "qazwsx2@aaa.com"
    })
    .end(function(err, res) {
      // console.log("kaka " + JSON.stringify(res.text));
      let resp = JSON.parse(res.text);
      expect(resp.result.status).equal(200);
      done();
    });
});
