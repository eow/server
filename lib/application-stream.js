var stream = require("readable-stream");

var ApplicationStream = module.exports = function ApplicationStream(options) {
  options = options || {};
  options.objectMode = true;

  stream.Transform.call(this, options);
};

ApplicationStream.prototype = Object.create(stream.Transform.prototype, {constructor: {value: ApplicationStream}});

ApplicationStream.prototype._transform = function _transform(input, encoding, done) {
  this.push(input);

  return done();
};