var stream = require("readable-stream");

var User = module.exports = function User(options) {
  options = options || {};
  options.objectMode = true;

  stream.Transform.call(this, options);
};
User.prototype = Object.create(stream.Transform.prototype, {constructor: {value: User}});

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
