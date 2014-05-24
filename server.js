#!/usr/bin/env node

var bencode = require("bencode"),
    burro = require("burro"),
    net = require("net"),
    stream = require("readable-stream");

var ApplicationStream = function ApplicationStream(options) {
  options = options || {};
  options.objectMode = true;

  stream.Transform.call(this, options);
};

ApplicationStream.prototype = Object.create(stream.Transform.prototype, {constructor: {value: ApplicationStream}});

ApplicationStream.prototype._transform = function _transform(input, encoding, done) {
  this.push(input);

  return done();
};

var server = net.createServer(function(socket) {
  var unframer = new burro.Unframer(),
      framer = new burro.Framer();

  var applicationStream = new ApplicationStream();

  socket.pipe(unframer).pipe(applicationStream).pipe(framer).pipe(socket);
});

server.listen(process.env.PORT || 3000, function() {
  console.log("listening");
});
