var User = require("./user");

var Application = module.exports = function Application(options) {
  this.clients = [];
};

Application.prototype.start = function(cb) {

  var self = this;

  setInterval(function() {

    self.tick();

  }, 1000);

  cb && cb();

}

Application.prototype.tick = function() {

  var self = this;

  for(var i = 0; i < this.clients.length; i++) {
    this.clients[i].tick();
  }

}

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

  user.on("login", user.login);
  user.on("login_required", user.login_required);

  return user;
};
