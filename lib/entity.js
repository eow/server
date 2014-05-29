var crypto = require('crypto');

var Entity = module.exports = function(application) {

	this.application = application;

	this.x = 0;
	this.y = 0;

	this.orientation = 0;

	this.name = "EOW Entity";

	this.id = crypto.pseudoRandomBytes(10).toString('hex');

}

Entity.prototype.setPosition = function(x, y) {

	if(this.application.map.isWalkableAt(x, y)) {
		this.x = x; this.y = y;
		this.application.map.setWalkableAt(x, y, false);
		return true;
	}

	return false;

}

Entity.prototype._inherit = function(c) {
  for(var f in c.prototype) {
    this.__proto__[f] = c.prototype[f];
  }
  c.call(this, this.application);
}

Entity.prototype.loadComponent = function(s) {
	var c = require('./components/' + s);
	this._inherit(c);
}

Entity.prototype.destroy = function() {
	this.destroyed = true;
};