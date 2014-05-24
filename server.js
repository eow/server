#!/usr/bin/env node

var net = require("net");

var server = net.createServer(function(socket) {
  socket.pipe(socket);
});

server.listen(process.env.PORT || 3000, function() {
  console.log("listening");
});
