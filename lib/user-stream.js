var stream = require("readable-stream");

var UserStream = module.exports = function UserStream(options) {
  options = options || {};
  options.objectMode = true;

  stream.Transform.call(this, options);
};

UserStream.prototype = Object.create(stream.Transform.prototype, {constructor: {value: UserStream}});

UserStream.prototype._transform = function _transform(input, encoding, done) {
  this.push(input);

  return done();
};