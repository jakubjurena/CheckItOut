process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const should = chai.should();

const app = require("../../../index");
const mongoose = require("mongoose");
const User = mongoose.model("User");

chai.use(chaiHttp);

const registredLogin = {
  email: "john@example.com",
  password: "john"
};

const newLogin = {
  email: "emily@example.com",
  password: "emily"
};

const witoutEmailLogin = {
  password: "secret"
};

const withoutPasswordLogin = {
  email: "bob@example.com"
};

describe("Local auth (integration tests)", function() {
  beforeEach(function(done) {
    User.remove({}, function(err) {
      if (err) done(err);
      User.create(
        {
          name: registredLogin.email,
          local: {
            email: registredLogin.email,
            password: registredLogin.password
          }
        },
        function(err, registredUser) {
          if (err) done(err);
          done();
        }
      );
    });
  });

  describe("REGISTRATION", function() {
    it("it should register new user with unique email", function(done) {
      chai
        .request(app)
        .post("/auth/local/signup")
        .send(newLogin)
        .end(async function(err, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.should.have.cookie("session");
          res.body.should.have.property("name", newLogin.email);
          res.body.should.have.property("registrationDate");
          res.body.should.have.property("local");
          res.body.local.should.have.property("connectDate");

          const user = await User.findOne({ "local.email": newLogin.email });

          user.should.have.property("name", newLogin.email);
          user.should.have.property("registrationDate");
          user.should.have.property("local");
          user.local.should.have.property("connectDate");
          done();
        });
    });
    it("it should be rejected if email is already used", function(done) {
      chai
        .request(app)
        .post("/auth/local/signup")
        .send(registredLogin)
        .end(async function(err, res) {
          res.should.have.status(403);
          res.should.have.cookie("session");
          res.body.should.have.property("errorMessage");

          const count = await User.count({});

          count.should.be.eql(1);

          done();
        });
    });
    it("it should be rejected if email is empty", function(done) {
      chai
        .request(app)
        .post("/auth/local/signup")
        .send(witoutEmailLogin)
        .end(async function(err, res) {
          res.should.have.status(403);
          res.should.have.cookie("session");
          res.body.should.have.property("errorMessage");

          const count = await User.count({});

          count.should.be.eql(1);

          done();
        });
    });
    it("it should be rejected if password is empty", function(done) {
      chai
        .request(app)
        .post("/auth/local/signup")
        .send(withoutPasswordLogin)
        .end(async function(err, res) {
          res.should.have.status(403);
          res.should.have.cookie("session");
          res.body.should.have.property("errorMessage");

          const count = await User.count({});

          count.should.be.eql(1);

          done();
        });
    });
  });

  describe("LOGIN", function() {
    it("it should log in registred user", function(done) {
      chai
        .request(app)
        .post("/auth/local/login")
        .send(registredLogin)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.have.cookie("session");
          res.body.should.have.property("name", registredLogin.email);
          res.body.should.have.property("local");

          done();
        });
    });
    it("it should be rejected if password doesn't match", function(done) {
      chai
        .request(app)
        .post("/auth/local/login")
        .send({
          email: registredLogin.email,
          password: "wrongPassword"
        })
        .end(function(err, res) {
          res.should.have.status(403);
          res.body.should.have.property("errorMessage");

          done();
        });
    });
    it("it should be rejected if email is not registred", function(done) {
      chai
        .request(app)
        .post("/auth/local/login")
        .send(newLogin)
        .end(function(err, res) {
          res.should.have.status(403);
          res.body.should.have.property("errorMessage");

          done();
        });
    });
  });

  describe("LOGOUT", function() {
    it("it should logout logged user", function(done) {
      const agent = chai.request.agent(app);
      agent
        .post("/auth/local/login")
        .send(registredLogin)
        .end(function(err, res) {
          res.should.have.status(200);
          res.should.have.cookie("session");
          res.body.should.have.property("name", registredLogin.email);
          res.body.should.have.property("local");

          agent.get("/auth/logout").end(function(err, res) {
            res.should.have.status(200);
            res.body.should.not.have.property("name");

            agent.get("/auth/current_user").end(function(err, res) {
              res.should.have.status(200);
              res.body.should.not.have.property("name");

              done();
            });
          });
        });
    });
  });
});
