var PF = require('pathfinding');

var User   = require("./user");
var Entity = require("./entity");

var Application = module.exports = function Application(options) {
  this.clients = [];

  this.mapWidth  = 50;
  this.mapHeight = 50;

  this.map = new PF.Grid(this.mapWidth, this.mapHeight);

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
  var user = new User(this);

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

Application.prototype.createEntity = function createEntity() {
  var entity = new Entity(this);
  return entity;
}