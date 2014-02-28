(function(root){

	var MovingShips = root.MovingShips = (root.MovingShip || {});
	var MovingShip = MovingShips.MovingShip = function(pos, vel, rotation_vel, color){
  		this.pos = pos;
  		this.vel = vel;
      this.rotation_vel = rotation_vel;
      this.setCollisionSpots();
  		this.color = color;
      this.angle = 0;
	}

  MovingShip.prototype.setCollisionSpots = function(){
    this.collision_spots = [[this.pos[0] + 20, this.pos[1] + 20], 
                        [this.pos[0] +10, this.pos[1] +20],
                        [this.pos[0] +0, this.pos[1] +20], 
                        [this.pos[0] +10, this.pos[1] +0]];
    for (var i =0; i < this.collision_spots.length; i++){
      this.collision_spots[i].radius = 0;
    }
  }

	MovingShip.prototype.draw = function(ctx){
  		ctx.fillStyle = this.color;
      ctx.translate(this.pos[0],this.pos[1]);
     // console.log(this.pos);
      ctx.rotate(this.rotation_vel);
      this.updateCollisonSpots();

      ctx.translate(this.pos[0]*-1,this.pos[1]*-1);
      ctx.beginPath(); 
      //ctx.lineTo(this.pos[0], this.pos[1]);
   		ctx.lineTo(this.pos[0] + 10, this.pos[1] + 20); // bottom right
   		ctx.lineTo(this.pos[0] +0, this.pos[1] +20); // bottom middle
   		ctx.lineTo(this.pos[0] -10, this.pos[1] +20); // bottom left
      ctx.lineTo(this.pos[0] -5, this.pos[1] +10); // left middle
   		ctx.lineTo(this.pos[0], this.pos[1]); // top
      ctx.lineTo(this.pos[0] +5, this.pos[1] +10); // right middle
      ctx.lineTo(this.pos[0] + 10, this.pos[1] + 20); // bottom right

   		ctx.stroke();      
   		ctx.closePath();
  		ctx.fill();	
      
	}

  MovingShip.prototype.updateCollisonSpots = function(){
     this.collision_spots = [[this.pos[0] + 20, this.pos[1] + 20], 
                        [this.pos[0] +10, this.pos[1] +20],
                        [this.pos[0] +0, this.pos[1] +20], 
                        [this.pos[0] +10, this.pos[1] +0]];
  }

	MovingShip.prototype.move = function(delta){
  	 this.pos[0] += this.vel[0] * delta;
 		 this.pos[1] += this.vel[1] * delta;
     this.updateCollisonSpots();

	}

	MovingShip.prototype.isCollidedWith = function(otherObject){

      if (Math.sqrt(Math.pow(this.collision_spots[0][0] - otherObject.pos[0],2) + Math.pow(this.collision_spots[0][1] - otherObject.pos[1],2)) < otherObject.radius){
        console.log("hit!");
        return true;
      }
      // else{
        // console.log(otherObject.pos[0] + " is the ASTEROID first param position");
        // console.log(otherObject.pos[1] + " is the ASTEROID second param position");
        // console.log(otherObject.radius + "is the ASTEROID radius");
        // console.log(this.collision_spots[0][0] + " is the SHIP first collision spot position"); 
        // console.log(this.collision_spots[0][1] + " is the SHIP second collision spot position");        
      // }
     
      if (Math.sqrt(Math.pow(this.collision_spots[1][0] - otherObject.pos[0],2) + Math.pow(this.collision_spots[1][1] - otherObject.pos[1],2)) < otherObject.radius){
        console.log("hit!");
        return true;
      }

      if (Math.sqrt(Math.pow(this.collision_spots[2][0] - otherObject.pos[0],2) + Math.pow(this.collision_spots[2][1] - otherObject.pos[1],2)) < otherObject.radius){
        console.log("hit!");
        return true;
      }

      if (Math.sqrt(Math.pow(this.collision_spots[3][0] - otherObject.pos[0],2) + Math.pow(this.collision_spots[3][1] - otherObject.pos[1],2)) < otherObject.radius){
        console.log("hit!");
        return true;
      }
	}

})(this);

