var assert = require("chai").assert;

var Application = require("../lib/application");

describe("the GAME", function() {

  var application, user1, user2;

  before(function(done) {

    application = new Application();
    user1 = application.createUser();
    user2 = application.createUser();

    application.start(done);

  });

  describe("a user", function() {

    var _user1name = "user1";

    it("should not be able to do anything when not logged in", function(done) {

      user1.once("data", function(response) {

        assert.equal(response.type, "chat");
        assert.equal(response.status, "login");
        done();

      });

      user1.write({
        type: "chat",
        data: {
          target: "user2", // doesn't exist yet, anyway
          message: "test"
        }
      });

    });

    it("should be able to login", function(done) {

      user1.once("data", function(response) {

        assert.equal(response.type, "login");
        assert.equal(response.status, "ack");
        assert.equal(response.data.name, _user1name);
        done();

      });

      user1.write({
        type: "login",
        data: {
          name: _user1name
        }
      });

    });

    it("should pass chat messages from one user to another", function(done) {

      user2.once("data", function(message) {
        assert.equal(message.type, "chat");
        assert.equal(message.data.target, "user2");
        assert.equal(message.data.message, "hello");

        return done();
      });

      user1.write({
        type: "chat",
        data: {
          target: "user2",
          message: "hello",
        },
      });

    });

  });

});
