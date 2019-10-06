var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);
let should = chai.should();

var expect = chai.expect;

it("dish should be inserted and return status code 200 ", function(done) {
  chai
    .request("http://127.0.0.1:3010")
    .post("/insertdish")
    .send({
      dish_name: "test dish",
      dish_desc: "Test dish to be insrted",
      type: "Dinner",
      dish_price: 10,
      email_id: "akshit@gmail.com"
    })
    .end(function(err, res) {
      console.log("kaka " + res.text);
      expect(res).to.have.status(200);
      done();
    });
});
