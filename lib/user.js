var stream = require("readable-stream");

var User = module.exports = function User(options) {
  options = options || {};
  options.objectMode = true;

  stream.Transform.call(this, options);
};
User.prototype = Object.create(stream.Transform.prototype, {constructor: {value: User}});

User.prototype._transform = function _transform(input, encoding, done) {
  if (input.type === "chat") {
    this.emit("chat", input.data.target, input.data.message);
  }

  return done();
};

User.prototype.chat = function chat(target, message) {
  this.push({
    type: "chat",
    data: {
      target: target,
      message: message,
    },
  });
};
