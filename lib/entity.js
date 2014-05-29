var crypto = require('crypto');

var MoveableEntity   = require('./moveableEntity');
var AttackableEntity = require('./attackableEntity');

var Entity = module.exports = function(application) {

	this.application = application;

	this.x = 0;
	this.y = 0;

	this.orientation = 0;

	this.name = "EOW Entity";

	this.id = crypto.pseudoRandomBytes(10).toString('hex');

	this._entityLoad();

}

Entity.prototype._entityLoad = function() {
  // Set random x,y pos
  var findPosition = function() {
    var x = Math.floor(Math.random()*this.application.mapHeight);
    var y = Math.floor(Math.random()*this.application.mapWidth);
    if(this.application.map.isWalkableAt(x, y)) {
      this.x = x; this.y = y;
      this.application.map.setWalkableAt(x, y, false);
    } else findPosition();
  }.bind(this);
  findPosition();
}

Entity.prototype._inherit = function(c) {
  for(var f in c.prototype) {
    this.__proto__[f] = c.prototype[f];
  }
  c.call(this, this.application);
}

Entity.prototype.canMove = function() {
	this._inherit(MoveableEntity);
}

Entity.prototype.canBeAttacked = function() {
	this._inherit(AttackableEntity);
}

Entity.prototype.destroy = function() {
	this.destroyed = true;
};