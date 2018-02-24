process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

describe("Auth routes (integration tests)", function() {
  describe("/current_user", function() {
    it.skip("GET /current_user when logged in", function(done) {
      done();
    });

    it.skip("cannot GET /current_user when not logged in", function(done) {
      done();
    });
  });
});
