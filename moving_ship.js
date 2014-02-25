(function(root){

	var MovingShips = root.MovingShips = (root.MovingShip || {});
	var MovingShip = MovingShips.MovingShip = function(pos, vel, rotation_vel, color){
  		this.pos = pos;
  		this.vel = vel;
      this.rotation_vel = rotation_vel;
  		this.color = color;
      this.angle = 0;
	}

	MovingShip.prototype.draw = function(ctx){
  		ctx.fillStyle = this.color;
      // x y
      var angle = this.angle;
      var x_angle = Math.cos(angle);
      var y_angle = Math.sin(angle);
  		ctx.beginPath();
   		ctx.lineTo(this.pos[0] + 20, this.pos[1] + 20);
   		ctx.lineTo(this.pos[0] +10, this.pos[1] +20);
   		ctx.lineTo(this.pos[0] +0, this.pos[1] +20);
   		ctx.lineTo(this.pos[0] +10, this.pos[1] +0);
   		ctx.stroke();
   		ctx.closePath();
  		ctx.fill();	

      ctx.beginPath();
      ctx.lineTo(x_angle + this.pos[0], y_angle + this.pos[0]);
      ctx.lineTo(this.pos[0] + x_angle+10, this.pos[0] + y_angle+10);
      ctx.lineTo(this.pos[0] +0, this.pos[1] +0);

      // @ pi/2 we want to point straight ahead
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