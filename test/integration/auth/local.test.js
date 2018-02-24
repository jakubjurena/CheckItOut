process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");

const app = require("../index.js");
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
      User.create(registredLogin, function(err, registredUser) {
        if (err) done(err);
        done();
      });
    });
  });

  after(function(done) {
    User.remove({}, function(err) {
      if (err) done(err);
      done();
    });
  });

  describe("REGISTRATION", function() {
    it("register new user with unique email", function(done) {
      done();
    });
    it("can't register new user with used email", function(done) {
      done();
    });
    it("registration must contain email", function(done) {
      done();
    });
    it("registration must contain password", function(done) {
      done();
    });
  });

  describe("LOGIN", function() {
    it("login registred user", function(done) {
      done();
    });
  });

  describe("LOGOUT", function() {
    it("logout logged user", function(done) {
      done();
    });
  });
});
