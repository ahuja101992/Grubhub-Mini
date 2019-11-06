var chai = require("chai"),
  chaiHttp = require("chai-http");

chai.use(chaiHttp);

var expect = chai.expect;

it("Should signup a buyer and see if a login id is created or not. return 200 if successful", function(done) {
  chai
    .request("http://127.0.0.1:3010")
    .post("/users/registerbuyer")
    .send({
      f_name: "Naman",
      l_name: "Agrawal",
      email_id: "naman12113@gmail.com",
      password: "naman12113@gmail.com",
      phone_num: "987654321"
    })
    .end(function(err, res) {
      console.log(JSON.stringify(res.text));
      let resp = JSON.parse(res.text);
      expect(resp.result.status).equal(200);
      done();
    });
});
