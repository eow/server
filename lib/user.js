var util  = require("util");
var stream = require("readable-stream");

var Entity         = require('./entity');
var MoveableEntity = require('./moveableEntity');

var User = module.exports = function User(options) {
  options = options || {};
  options.objectMode = true;
  stream.Transform.call(this, options);
};

util.inherits(User, stream.Transform);

User.prototype.load = function() {
  var cs = [ Entity, MoveableEntity ];

  for(var i = 0; i < cs.length; i++) {
    for(var f in cs[i].prototype) {
      this.__proto__[f] = cs[i].prototype[f];
      cs[i].call(this);
    }
  }

}

User.prototype._transform = function _transform(input, encoding, done) {

  if(!this.loggedIn) {
    if (input.type === "login") {
      this.emit("login", input.data.name);
    } else {
      this.emit("login_required", input);
    }
    return done();
  }
  
  if (input.type === "chat") {
    this.emit("chat", input.data.target, input.data.message);
  }

  return done();
};

User.prototype.tick = function tick() {


}

User.prototype.login = function login(name) {
  this.name = name;
  this.loggedIn = true; 
  this.push({
    type:   "login",
    status: "ack",
    data: {
      name: name
    }
  });
}

User.prototype.login_required = function login_required(input) {
  input.status = 'login';
  this.push(input);
}

User.prototype.chat = function chat(target, message) {
  this.push({
    type: "chat",
    data: {
      target: target,
      message: message,
    },
  });
};
