#!/usr/bin/env node

var bencode = require("bencode"),
    burro = require("burro"),
    net = require("net");

var ApplicationStream = require("./lib/application-stream");

var server = net.createServer(function(socket) {
  var unframer = new burro.Unframer(),
      framer = new burro.Framer();

  var applicationStream = new ApplicationStream();

  socket.pipe(unframer).pipe(applicationStream).pipe(framer).pipe(socket);
});

server.listen(process.env.PORT || 3000, function() {
  console.log("listening");
});
