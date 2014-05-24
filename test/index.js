var ApplicationStream = require("../lib/application-stream");

describe("the application stream", function() {
  it("shouldn't suck", function(done) {
    return done(Error("it sucks"));
  });
});
