var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);
let should = chai.should();

var expect = chai.expect;

it("Delete a dish with id 100 and return id dish is successfully deleted ", function(done) {
  chai
    .request("http://127.0.0.1:3010")
    .post("/deletedish")
    .send({
      dish_id: "100"
    })
    .end(function(err, res) {
      console.log("kaka " + res.text);
      expect(res).to.have.status(200);
      done();
    });
});
