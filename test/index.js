var assert = require("chai").assert;

var async = require('async');

var Application = require("../lib/application");

describe("the GAME", function() {

  var application, user1, user2, entity;

  before(function(done) {

    application = new Application();
    user1       = application.createUser();
    user2       = application.createUser();
    entity      = application.createEntity();

    async.parallel([
      user1.load,
      user2.load
    ], done);

  });

  describe("an entity", function() {

    it("should have a fixed starting position", function(done) {

      assert.equal(entity.x, 0);
      assert.equal(entity.y, 0);
      done();

    });

    it("should be able to dynamically inherit classes", function(done) {

      assert.equal(entity.velocity, undefined);
      entity.loadComponent('moveable');
      assert.equal(entity.velocity, 0);
      entity.loadComponent('attackable');
      assert.equal(entity.health, 100);
      done();

    });

    it("should be destroyed when it takes too much damage", function(done) {

      var destroyed = entity.hit(1);
      assert.equal(destroyed, false);
      destroyed = entity.hit(99999999);
      assert.equal(destroyed, true);
      done();

    });

  });

  describe("a user", function() {

    var _user1name = "user1";

    it("should not be able to do anything when not 'logged in'", function(done) {

      user1.once("data", function(response) {

        assert.equal(response.type, "chat");
        assert.equal(response.status, "login");
        done();

      });

      user1.write({
        type: "chat",
        data: {
          target: "user2",
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
