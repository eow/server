var util  = require("util");
var stream = require("readable-stream");

var Entity = require('./entity');

var User = module.exports = function User(application, options) {
  this.application = application;
  options = options || {};
  options.objectMode = true;
  stream.Transform.call(this, options);
};

util.inherits(User, stream.Transform);

User.prototype.load = function() {
  // Manually inherit from Entity
  for(var f in Entity.prototype) {
    this.__proto__[f] = Entity.prototype[f];
  }
  Entity.call(this, this.application);

  this.canMove();
  this.canBeAttacked();

};

User.prototype._transform = function _transform(input, encoding, done) {

  if(!this.loggedIn) {
    if (input.type === "login") {
      this.emit("login", input.data);
    } else {
      this.emit("login_required", input);
    }
    return done();
  }

  this.emit(input.type, input.data);

  return done();
};

User.prototype.tick = function tick() {


}

User.prototype.login = function login(data) {
  this.name     = data.name;
  this.loggedIn = true;
  this.push({
    type:   "login",
    status: "ack",
    data: {
      name: data.name
    }
  });
}

User.prototype.login_required = function login_required(input) {
  input.status = 'login';
  this.push(input);
}

User.prototype.chat = function chat(data) {
  this.push({
    type: "chat",
    data: {
      target:  data.target,
      message: data.message,
    },
  });
};
