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

  Ship.prototype.rotate = function(rotation_increment){
    var context = game.ctx;
    
    if(this.rotation_vel >0 && this.rotation_vel >= .2){
      this.rotation_vel = .2;
    }
    else if(this.rotation_vel < 0 && this.rotation_vel <= -.2){
      this.rotation_vel = -.2
    }
    else{
      this.rotation_vel += rotation_increment;     
    }
    context.translate(context.canvas.width/2,context.canvas.height/2);
    context.rotate(this.rotation_vel);
    //game.stop();
    context.translate(context.canvas.width*-1/2,context.canvas.height*-1/2);
    this.draw(context);
    context.restore();

   // game.ctx.translate(game.ct)
    this.angle += this.rotation_vel;
    this.angle = this.angle % (2 * Math.PI);
    // game.ctx.rotate(rotation_increment);
    return this.angle;
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
    var speed = Math.sqrt(Math.pow(this.vel[0],2) + Math.pow(this.vel[1],2));
    if (speed == 0){
      return [0,-1];
    }
    else{
      return [this.vel[0]/speed, this.vel[1]/speed];  
    }
  }

  Ship.prototype.fireBullet = function(){
    if (this.vel != 0){
      return new Bullet(this.pos.slice(), [this.direction()[0]*this.GUN_SPEED, this.direction()[1]*this.GUN_SPEED]);
    }
  }

})(this);
