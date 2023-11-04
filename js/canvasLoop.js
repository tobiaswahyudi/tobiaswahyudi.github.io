/******************************************************************************
 * Render Canvas
 *****************************************************************************/

let lastTimestamp = 0;

const renderCanvas = (timestamp) => {
    const ctx = document.getElementById("world").getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;
  
    const main = document.getElementsByTagName('main')[0];
    const scrollTop = main.scrollTop;
  
  ctx.clearRect(0, 0, width, height);

  // if(timestamp - lastTimestamp > 1/30) {
  //   renderParticles(ctx, width, height, scrollTop);
  //   lastTimestamp = timestamp;
  // }
  renderWorld(ctx, width, height, scrollTop);
  window.requestAnimationFrame(renderCanvas);
}

/******************************************************************************
 * ON INIT
 *****************************************************************************/
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("world");

  // On window resize, resize the canvas.
  window.addEventListener('resize', () => {
    resizeCanvas(canvas);
  })

  // Resize the canvas on init.
  resizeCanvas(canvas);

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  initializeParticles(screenWidth, screenHeight);

  // Start rendering the canvas.
  window.requestAnimationFrame(renderCanvas);
})