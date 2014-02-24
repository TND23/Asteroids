(function(root){

	var MovingShips = root.MovingShips = (root.MovingShip || {});
	var MovingShip = MovingShips.MovingShip = function(pos, vel, rotation_vel, color){
  		this.pos = pos;
  		this.vel = vel;
      this.rotation_vel = rotation_vel;
  		this.color = color;
	}

	MovingShip.prototype.draw = function(ctx){
  		ctx.fillStyle = this.color;
  		ctx.beginPath();
   		ctx.lineTo(this.pos[0] + 20, this.pos[1] + 20);
   		ctx.lineTo(this.pos[0] +10, this.pos[1] +20);
   		ctx.lineTo(this.pos[0] +0, this.pos[1] +20);
   		ctx.lineTo(this.pos[0] +10, this.pos[1] +0);
   		ctx.stroke();
   		ctx.closePath();
  		ctx.fill();	
	}

	MovingShip.prototype.move = function(delta){
  	 this.pos[0] += this.vel[0] * delta;
 		 this.pos[1] += this.vel[1] * delta;
	}

	MovingShip.prototype.isCollidedWith = function(otherObject){

  		distance = Math.sqrt(
    		Math.pow(this.pos[0] - otherObject.pos[0],2) + Math.pow(this.pos[1] - otherObject.pos[1], 2)
		);
  	return (otherObject.radius + this.radius > distance);
	}

})(this);