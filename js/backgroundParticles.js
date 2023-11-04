/******************************************************************************
 * Background Particle Renderer - toby.wahyudi.ca / tobiaswahyudi.github.io
 * 
 * Benedict Tobias H. Wahyudi, November 2023
 *****************************************************************************/

const PARTICLES_CONFIG = {
  // Extends tracking of particles outside of the screen by this extent.
  screenPadding: 100,
  // How many particles should be on screen at any given time
  particleCount: 50,
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
  }

  update() {
    this.y += this.vel;
    this.x += this.vel * Math.sqrt(3);
    this.currentOpacity = (this.currentOpacity + this.targetOpacity)/2;
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
    1 + Math.random(),
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