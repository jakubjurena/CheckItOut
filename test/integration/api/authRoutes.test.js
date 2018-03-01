process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

const app = require("../../../index");
const mongoose = require("mongoose");
const User = mongoose.model("User");

chai.use(chaiHttp);

const john = {
  name: "John Doe",
  local: {
    email: "john@example.com",
    password: "secret"
  }
};

const eva = {
  name: "Eva Carter",
  local: {
    email: "eva@example.com",
    password: "takeItEasy"
  }
};

function mockDb() {}

function loginUser(agent, user, callback) {
  agent
    .post("/auth/local/login")
    .send({
      email: john.local.email,
      password: john.local.password
    })
    .end(function(err, res) {
      if (err) return callback(err, null);
      callback(null, res);
    });
}

describe("Auth routes (integration tests)", function() {
  before(function(done) {
    User.remove({}, function(err) {
      if (err) return done(err);
      User.create([john, eva], function(err, createdUser) {
        if (err) return done(err);
        done();
      });
    }).catch(function(err) {
      done(err);
    });
  });

  describe("/current_user", function() {
    it("it should GET /current_user when logged in", function(done) {
      const agent = chai.request.agent(app);
      loginUser(agent, john, function(err, res) {
        if (err) return done(err);
        agent
          .get("/auth/current_user")
          .then(function(res) {
            res.should.have.property("body");
            res.body.should.have.property("name", john.name);
            res.body.should.have.property("local");

            done();
          })
          .catch(function(err) {
            done(err);
          });
      });
    });

    it("it cannot GET /current_user when not logged in", function(done) {
      chai
        .request(app)
        .get("/auth/current_user")
        .then(function(res) {
          res.should.have.status(200);
          res.should.have.property("body");
          res.body.should.not.have.property("name");
          res.body.should.not.have.property("local");

          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });
});
