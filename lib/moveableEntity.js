var MoveableEntity = module.exports = function() {
	
	this.velocity = 0;

}

MoveableEntity.prototype.move = function(x, y) {

	

}

MoveableEntity.prototype.stop = function() {
	this.move(this.x, this.y);
}