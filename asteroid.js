(function(root){
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  var inherits = function(child, parent) {
    function Surrogate() {};
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate();
  };

  var Asteroid = Asteroids.Asteroid = function(pos, vel) {
    var COLOR = "#AAAAAA";
    var minSize = .5;
    var RADIUS = 100 * ((minSize * Math.random()) + minSize);
    this.radius = RADIUS;
    MovingObjects.MovingObject.call(this, pos, vel, RADIUS, COLOR);
  };

  inherits(Asteroid, root.MovingObjects.MovingObject);

  var randomAsteroid = Asteroids.randomAsteroid = function(dimX, dimY){   

    var STARTING_VELOCITY = 0.01;
    var starting_pos = [Math.random()*dimX, Math.random()*dimY];
    var in_random_direction = Math.random() > 0.5 ? -1 : 1;
   
    var starting_vel = [Math.random()*STARTING_VELOCITY*in_random_direction,
      Math.random()*STARTING_VELOCITY*in_random_direction];
    return new Asteroid(starting_pos, starting_vel);
  }

  var explode = Asteroids.explode = function(asteroid){
    if (asteroid.radius > 14){
      var asteroids = [];
      var asteroid_child_a = new Asteroid([asteroid.pos[0]+10,asteroid.pos[1]-10], [asteroid.vel[0]*1.3,asteroid.vel[1]*1.3]);
      asteroid_child_a.radius = asteroid.radius / 2;
      var asteroid_child_b = new Asteroid(asteroid.pos, [asteroid.vel[0]*-1.6,asteroid.vel[1]*-1.6]);
      asteroid_child_b.radius = asteroid.radius / 2;
      asteroids.push(asteroid_child_a);
      asteroids.push(asteroid_child_b);
      return asteroids;
    }
    else{
      return 0;
    }
  }

})(this);