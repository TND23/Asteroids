(function(root){
  var Ship = root.Ship = (root.Ship || {});

  var inherits = function(child, parent) {
    function Surrogate() {}
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
  }

  var Ship = Ship.ship = function(pos, vel, rotation_vel) {
    var COLOR = "#2233AA";
    var RADIUS = 20;
    this.ENGINE = 0.04;
    this.GUN_SPEED = 0.12;
    this.MAX_SPEED = .1;
    this.top_corner = [0, 0];
    this.left_corner = [-10, 20];
    this.right_corner = [10, 20];
    this.rotation_increment = 0;
    this.angle = 0;
    this.rotation_vel = rotation_vel;
    MovingShips.MovingShip.call(this, pos, vel, rotation_vel, COLOR);
  };

  inherits(Ship, root.MovingShips.MovingShip);

  Ship.prototype.power = function(impulse) {
    if (Math.abs(this.vel[0]) < this.MAX_SPEED || Math.abs(this.vel[0] + impulse[0]) < this.MAX_SPEED){
      this.vel[0] += impulse[0];  
    }
    
    if (Math.abs(this.vel[1]) < this.MAX_SPEED || Math.abs(this.vel[1] + impulse[1]) < this.MAX_SPEED){
      this.vel[1] += impulse[1];  
    }
  }

  Ship.prototype.slowDown = function(){
    if (Math.abs(this.vel[0]) < .02){
      this.vel[0] = 0;  
    }
    else{
      this.vel[0] *= .75;
    }
    if (Math.abs(this.vel[1]) < .02){
      this.vel[1] = 0;  
    }
    else{
      this.vel[1] *= .75;
    }
    
  }

  // Ship.prototype.rotate = function(rotation_vel){
  //   this.angle += rotation_vel;
  //   this.angle %= (2*Math.PI)
  // }

  Ship.prototype.turn = function(rotation_increment){

    this.rotation_increment+=rotation_increment;
    this.angle += rotation_increment;
    this.angle %= (2*Math.PI)
    var angle = this.angle;
    if(this.rotation_vel >= 2*Math.PI){
      this.rotation_vel = 0;
    }
    else if(this.rotation_vel <= -2*Math.PI){
      this.rotation_vel = 0;
    }
    else{
      this.rotation_vel += rotation_increment;     
    }
    this.update_corners(angle);
   // this.angle += rotation_increment;
  }

  Ship.prototype.update_corners = function(angle){
    this.left_collision_spot = [this.pos[0] + this.left_corner[0]*Math.cos(angle), this.pos[1] + this.left_corner[1]*Math.sin(angle)];
  }

  var Bullet = Ship.Bullet = function(pos, vel){
    this.pos = pos;
    this.vel = vel;
    var COLOR = "#AA3388";
    var RADIUS = 5;
    MovingObjects.MovingObject.call(this, pos, vel, RADIUS, COLOR);
  }

  inherits(Bullet, root.MovingObjects.MovingObject);

  Ship.prototype.direction = function() {
    return ([Math.sin(this.angle), Math.cos(this.angle)*-1]);
    // var speed = Math.sqrt(Math.pow(this.vel[0],2) + Math.pow(this.vel[1],2));
    // if (speed == 0){
    //   return [0,-1];
    // }
    // else{
    //   return [this.vel[0]/speed + Math.cos(this.angle), this.vel[1]/speed + Math.sin(this.angle)];  
    // }
  }

  Ship.prototype.fireBullet = function(){
    if (this.vel != 0){
      return new Bullet(this.pos.slice(), [this.direction()[0]*this.GUN_SPEED, this.direction()[1]*this.GUN_SPEED]);
    }
  }

})(this);
