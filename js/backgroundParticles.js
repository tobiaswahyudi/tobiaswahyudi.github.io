/******************************************************************************
 * Background Particle Renderer - toby.wahyudi.ca / tobiaswahyudi.github.io
 * 
 * Benedict Tobias H. Wahyudi, November 2023
 *****************************************************************************/

const PARTICLES_CONFIG = {
  // Extends tracking of particles outside of the screen by this extent.
  screenPadding: 100,
  // How many particles should be on screen at any given time
  particleCount: 40,
  
  // Probability to deflect from the SE path to an E path or an S path
  deflectionProbability: 0.1,
  // Minimum length on a SE path before the particle can deflect again
  deflectionMinimalLength: 50,
  // Probability to recover from an E path or an S path to the SE path
  recoverProbability: 0.1,
  // Minimum length on an S path before the particle can recover
  recoveryMinimalLengthSouth: 5,
  // Minimum length on an E path before the particle can recover
  deflectionMinimalLengthEast: 10,

  // Maximum paths to track
  pathsToTrack: 4,
}

// Helper class: circular buffer
class CircularBuffer {
  constructor(capacity){
    this.arr = [];
    this.arr.length = capacity;
    this.arr.fill(null);
    this.front = 0;
    this.back = -1;
    this.count = 0;
    this.capacity = capacity;
  }

  full() {
    return this.count == this.capacity;
  }

  push(el) {
    this.back = (this.back+1) % this.capacity;
    this.arr[this.back] = el;
    this.count++;
  }

  pop() {
    this.arr[this.front] = null;
    this.front = (this.front+1) % this.capacity;
    this.count--;
  }

  at(idx) {
    idx = (this.back - idx + this.capacity) % this.capacity;
    return this.arr[idx];
  }
}

/**********************************************
 * Particle Class
 **********************************************/

class BackgroundParticle {
  constructor(x, y, vel, radius, opacity) {
    this.x = x;
    this.y = y;
    this.vel = vel;
    this.radius = radius;
    this.currentOpacity = 0;
    this.targetOpacity = opacity;

    this.pathPoints = new CircularBuffer(PARTICLES_CONFIG.pathsToTrack + 1);
    this.pathPoints.push([x,y]);
    this.direction = "SE";
  }

  update() {
    this.currentOpacity += (this.targetOpacity - this.currentOpacity) * 0.3;

    switch(this.direction) {
      case "SE": {
        this.y += this.vel;
        this.x += this.vel * Math.sqrt(3);
        if(Math.random() < PARTICLES_CONFIG.deflectionProbability) {
          const lastPoint = this.pathPoints.at(0);
          if(Math.hypot(this.x - lastPoint[0], this.y - lastPoint[1]) < PARTICLES_CONFIG.deflectionMinimalLength) break;

          this.direction = (Math.random() < 0.5) ? "S" : "E";
          if(this.pathPoints.full()) this.pathPoints.pop();
          this.pathPoints.push([this.x, this.y]);
        }
        break;
      }
      case "S": {
        this.y += this.vel;
        if(Math.random() < PARTICLES_CONFIG.recoverProbability) {
          const lastPoint = this.pathPoints.at(0);
          if(this.y - lastPoint[1] < PARTICLES_CONFIG.recoveryMinimalLengthSouth) break;

          this.direction = "SE";
          if(this.pathPoints.full()) this.pathPoints.pop();
          this.pathPoints.push([this.x, this.y]);
        }
        break;
      }
      case "E": {
        this.x += this.vel * Math.sqrt(3);
        if(Math.random() < PARTICLES_CONFIG.recoverProbability) {
          const lastPoint = this.pathPoints.at(0);
          if(lastPoint[0] - this.x < PARTICLES_CONFIG.recoveryMinimalLengthEast) break;

          this.direction = "SE";
          if(this.pathPoints.full()) this.pathPoints.pop();
          this.pathPoints.push([this.x, this.y]);
        }
        break;
      }
    }
  }

  isOnScreen(screenTop, screenWidth, screenHeight) {
    const screenLeft = screenTop * Math.sqrt(3);
    return (
      (screenLeft - PARTICLES_CONFIG.screenPadding < this.x) &&
      (this.x < screenLeft + screenWidth + PARTICLES_CONFIG.screenPadding) &&
      (screenTop - PARTICLES_CONFIG.screenPadding < this.y) &&
      (this.y < screenTop + screenHeight + PARTICLES_CONFIG.screenPadding)
    );
  }

  render(context, screenTop) {
    const screenLeft = screenTop * Math.sqrt(3);

    context.fillStyle = `rgba(131,203,234,${this.currentOpacity})`;
    context.strokeStyle = context.fillStyle;
    context.lineWidth = this.radius;

    context.beginPath();
    context.moveTo(this.x - screenLeft, this.y - screenTop);
    for(let i = 0; i < this.pathPoints.count; i++) {
      const point = this.pathPoints.at(i);
      context.lineTo(point[0] - screenLeft, point[1] - screenTop);
    }
    context.stroke();


    context.beginPath(); 
    context.arc(this.x - screenLeft, this.y - screenTop, this.radius, 0, Math.PI * 2);
    context.closePath();
    context.fill();
  }
};

const randomParticle = (screenTop, screenWidth, screenHeight) => {
  const screenLeft = screenTop * Math.sqrt(3);
  return new BackgroundParticle(
    screenLeft - PARTICLES_CONFIG.screenPadding + (Math.random() * (screenWidth + 2*PARTICLES_CONFIG.screenPadding)),
    screenTop - PARTICLES_CONFIG.screenPadding + (Math.random() * (screenHeight + 2*PARTICLES_CONFIG.screenPadding)),
    (1 + Math.random()) * 0.8,
    1 + (Math.random()) * 2,
    (0.5 + Math.random()) * 0.3
  );
}

/**********************************************
 * Main Render Loop
 **********************************************/

const particles = [];

const initializeParticles = (screenWidth, screenHeight) => {
  for(let i = 0; i < PARTICLES_CONFIG.particleCount; i++) particles.push(randomParticle(0, screenWidth, screenHeight));
}

const renderParticles = (ctx, width, height, scrollTop) => {
  ctx.clearRect(0, 0, width, height);

  for(var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].render(ctx, scrollTop);
    if(!particles[i].isOnScreen(scrollTop, width, height)) {
      particles[i] = randomParticle(scrollTop, width, height);
    }
  };
}