#!/usr/bin/env node

var bencode = require("bencode"),
    burro = require("burro"),
    net = require("net");

var Application = require("./lib/application");

var application = new Application();

var server = net.createServer(function(socket) {
  
  var unframer = new burro.Unframer();
  var framer   = new burro.Framer();

  var user = application.createUser();
  user.load();

  socket.pipe(unframer).pipe(user).pipe(framer).pipe(socket);

});

server.listen(process.env.PORT || 3000, function() {
	application.start();
  console.log("listening");
});
