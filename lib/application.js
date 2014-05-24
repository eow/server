var User = require("./user");

var Application = module.exports = function Application(options) {
  this.clients = [];
};

Application.prototype.createUser = function createUser() {
  var user = new User();

  this.clients.push(user);

  var self = this;
  user.on("chat", function(target, message) {
    self.clients.forEach(function(client) {
      if (client === user) {
        return;
      }

      client.chat(target, message);
    });
  });

  return user;
};
