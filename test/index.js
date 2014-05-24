var assert = require("chai").assert;

var Application = require("../lib/application");

describe("the application", function() {
  it("should pass chat messages from one user to another", function(done) {
    var application = new Application(),
        user1 = application.createUser(),
        user2 = application.createUser();

    user2.on("data", function(message) {
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
