var AttackableEntity = module.exports = function() {
	
	this.health = 100;	

}

AttackableEntity.prototype.hit = function(damage) {
	
	this.health -= damage;

	if(this.health <= 0) {
		this.destroy();
		return true;
	} else {
		return false;
	}

};