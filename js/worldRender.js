/******************************************************************************
 * World Rendered - toby.wahyudi.ca / tobiaswahyudi.github.io
 * 
 * Benedict Tobias H. Wahyudi, November 2023
 *****************************************************************************/

/**
 * Resizes a canvas to fit the screen.
 * 
 * @param {*} canvas - the canvas which we will resize.
 */
const resizeCanvas = (canvas) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.width = `${window.innerWidth}px`
  canvas.style.height = `${window.innerHeight}px`
}

const initUnit = (unit) => {
  if (unit.img != undefined) return;

  unit.img = new Image();
  unit.img.src = unit.src;
}

world.forEach(unit => initUnit(unit))

const renderWorld = (timestamp) => {
  const ctx = document.getElementById("world").getContext('2d');
  const width = window.innerWidth;
  const height = window.innerHeight;

  const main = document.getElementsByTagName('main')[0];
  const currentHeight = main.scrollTop - 0.5*height;

  // The world origin is located on this spot
  const origin = { x: 0.5 * width, y: 0.5 * height }

  ctx.clearRect(0, 0, width, height);

  let currentPos = { x: origin.x - currentHeight * Math.sqrt(3), y: origin.y - currentHeight };

  world.forEach(unit => {
    ctx.drawImage(unit.img,
      currentPos.x + unit.offset.x,
      currentPos.y + unit.offset.y
    );
    currentPos.x += unit.size.x;
    currentPos.y += unit.size.y;
  })

  window.requestAnimationFrame(renderWorld);
}

/******************************************************************************
 * ON INIT
 *****************************************************************************/
document.addEventListener('DOMContentLoaded', () => {
  const worldCanvas = document.getElementById("world");
  const ctx = worldCanvas.getContext('2d');

  console.log(ctx);

  window.requestAnimationFrame(renderWorld);

  /****************************************************************************
   * SETUP
   ***************************************************************************/
  // Give each section the inverse isometric transform
  [...document.getElementsByTagName('section')].forEach(sec => {
    sec.style.transform = isometricInverse(0, 0);
  })
  // Attach to cars and such

  /****************************************************************************
   * LISTENERS
   ***************************************************************************/
  // On resize, call the scroller and aligner functions.
  window.addEventListener('resize', () => {
    // const pos = main.scrollTop;
    // (scroller(main, mainContents))({ target: { scrollTop: pos } });
    resizeCanvas(worldCanvas);
  })
  /****************************************************************************
   * FINALIZE
   ***************************************************************************/
  resizeCanvas(worldCanvas);
  // Initialize sections alignment
  // alignSections(mainContents);
  // Call the scroller function to initialize the `#main-contents` transform.
  // (scroller(main, mainContents))({ target: { scrollTop: 0 } });
})