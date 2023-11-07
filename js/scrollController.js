/******************************************************************************
 * Scroll Controller - toby.wahyudi.ca / tobiaswahyudi.github.io
 * 
 * Benedict Tobias H. Wahyudi, April 2022
 *****************************************************************************/

/** Multiplicative constants.
 * Used to center and scroll the `#main-contents` div.
 */ 
 const WIDTH_CONST = 0;
 const HEIGHT_CONST = 0 
// If the actual isometric transform is used, actual offsets are needed
// const WIDTH_CONST = 0.4;
// const HEIGHT_CONST = -0.25;
const POS_CONST = -Math.sqrt(3);

/******************************************************************************
 * FUNCTIONS
 *****************************************************************************/

/**
 * A helper function to generate CSS `matrix3d` transformation projecting from 
 * screen-parallel space to 3d isometric space.
 * 
 * @param {number} offsetX - X offset, used in the translation column of the affine matrix.
 * @param {number} offsetY - Y offset, used in the translation column of the affine matrix.
 * @returns a CSS `matrix3d` transformation that projects a screen-parallel
 * plane to an isometric plane.
 */
const isometric = (offsetX, offsetY) =>
`matrix3d(
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  ${offsetX}, ${offsetY}, 0, 1
)`
// This matrix actually transforms the doc into isometric view.
// `matrix3d(
//   0.71, -0.5, 0.5, 0,
//   0.71, 0.5, -0.5, 0,
//   0, 0.71, 0.71, 0,
//   ${offsetX}, ${offsetY}, 0, 1
// )`

/**
 * Sometimes we want an object to move in isometric space, but retain a screen parallel appearance.
 * This function generates a transform that inverses the transformation generated by the `isometric`
 * function.
 * 
 * @param {number} offsetX - X offset, used in the translation column of the affine matrix.
 * @param {number} offsetY - Y offset, used in the translation column of the affine matrix.
 * @returns a CSS `matrix3d` transform string inversing the transformation generated by `isometric()`.
 */
const isometricInverse = (offsetX, offsetY) =>
`matrix3d(
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  ${offsetX}, ${offsetY}, 0, 1
)`
// This matrix actually inverts the matrix that transforms into isometric view.
// `matrix3d(
//   0.71, 0.71, 0, 0,
//   -0.5, 0.5, 0.71, 0,
//   0.5, -0.5, 0.71, 0,
//   ${offsetX}, ${offsetY}, 0, 1
// ) scale(1, 2)`

/**   
 *   Returns a value in [0,1] as follows:
 * ```
 *    val
 *     ^
 *   1 |      ,------------.
 *     |     /|            |\
 *     |    / |            | \
 *     |   /  |            |  \
 *   0 --------------------------->  now
 *        n   r            s   x  
 * 
 *   where
 *    n = min
 *    x = max
 *    r = (max-min)*ratio + min
 *    s = (max-min)*(1 - ratio) + min
 * ```
 * @param {Number} min 
 * @param {Number} max 
 * @param {Number} ratio 
 * @param {Number} now 
 * @returns 
 */
const smoothe = (min, max, ratio, now) => {
  if( now < min || now > max ) return 0;
  const range = max - min;
  const normalized = (now - min) / range;

  if( normalized < ratio ) return (normalized/ratio);
  if( normalized > (1 - ratio) ) return ((1-normalized)/ratio);
  return 1;
}

/**
 * Creates a listener that checks if the middle of the screen is within [scrollTop, scrollBottom].
 * If so, it turns the contentDiv opaque, otherwise turns it transparent.
 * 
 * @param {String} contentId
 * @param {Number} scrollTop 
 * @param {Number} scrollBottom 
 * @returns a listener.
 */
const scrollListenerForContent = (contentId, scrollTop, scrollBottom) => () => {
  const contentDiv = document.getElementById(contentId)
  const main = document.getElementsByTagName('main')[0];
  
  const screenHeight = window.innerHeight;
  const currentHeight = main.scrollTop - 0.5 * screenHeight;

  const opacity = smoothe(scrollTop, scrollBottom, 0.1, currentHeight);
  contentDiv.style.opacity = opacity;
  if(opacity == 0){
    contentDiv.style.display = "none";
  } else {
    contentDiv.style.display = "flex";
  }
}

/**
 * Creates a listener that checks if the middle of the screen is within [scrollTop, scrollBottom].
 * If so, it turns on the .active-nav class on a nav element, otherwise turns the class off.
 * 
 * @param {String} navId 
 * @param {Number} scrollTop 
 * @param {Number} scrollBottom 
 * @returns a listener.
 */
const scrollListenerForNavbar = (navId, scrollTop, scrollBottom) => () => {
  const navDiv = document.getElementById(navId);
  const main = document.getElementsByTagName('main')[0];
  
  const screenHeight = window.innerHeight;
  const currentHeight = main.scrollTop - 0.5 * screenHeight;

  if(scrollTop <= currentHeight && currentHeight <= scrollBottom) {
    navDiv.classList.add('active-nav');
    navDiv.style.flex = 2;
    navDiv.style.fontSize = "1.4em";
  } else {
    navDiv.classList.remove('active-nav');
    navDiv.style.flex = 1;
    navDiv.style.fontSize = "1em";
  }
}

// Defined here, since it's used for scroll listening and for scrollTo-ing.
const navbarBreakpoints = [
  ['about', 100, 330],
  ['work', 830, 1800],
]

const scrollListeners = [
  scrollListenerForContent('workexperience-content', 470, 675),
  scrollListenerForContent('splunk-content', 870, 1180),
  scrollListenerForContent('layer6-content', 1450, 1760),
  scrollListenerForContent('road-work-ahead-content', 1940, 2240)
].concat(
  navbarBreakpoints.map(params => scrollListenerForNavbar(...params))
);


/**
 * Scroll listener. When the `main` container is scrolled, moves `mainContents` along the isometric `-y` axis.
 * 
 * @param {*} main - only used to get the size of the `main` container.
 * @param {*} mainContents - the `#main-container` element to move.
 * @returns a scroll event listener.
 */
const scroller = (main, mainContents) => (e) => {
  const pos = e.target.scrollTop;

  const x0 = WIDTH_CONST * main.offsetWidth;
  const y0 = HEIGHT_CONST * main.offsetHeight;

  const dx = POS_CONST * pos;
  // const dy = -pos;
  // There's so much CSS/JS interference that I don't fully comprehend why this is zero. :)
  const dy = 0;
  console.log(pos, main.scrollTop - (window.innerHeight / 2))

  mainContents.style.transform = isometric(x0 + dx, y0 + dy);

  scrollListeners.forEach(f => f());
}

/**
 * Aligns the sections on page init.
 * 
 * @param {*} mainContents - the `#main-container`, whose children we will align.
 */
 const alignSections = (mainContents) => {
   let totalHeight = 0;
  [...mainContents.children].forEach((section, idx) => {
    // Skip title section
    if(idx == 0) return;

    const height = Number(section.dataset.height);
    const width = -POS_CONST * height;
    section.style.height = `${height}rem`;
    section.style.width = `${width}rem`;
    section.style.left = `calc( ${-POS_CONST} * ( 90vh + ${totalHeight}rem ) + ( 50vw - ( ${-POS_CONST} * 50vh ) ) )`;
    section.style.top = `calc( 100vh + ${totalHeight}rem )`;
    totalHeight += height;

    const sectionId = section.id;
    const contentId = sectionId + "-content";
    const sectionContent = document.getElementById(contentId);

    if(sectionContent){
      const scrollTop = Number(getComputedStyle(section).top.split('px')[0]);
      scrollListeners.push( scrollListenerForContent(contentId, scrollTop, scrollTop + section.scrollHeight) );
    }
  })
}

/******************************************************************************
 * ON INIT
 *****************************************************************************/
document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementsByTagName('main')[0];
  const mainContents = document.getElementById('main-contents');

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
    const pos = main.scrollTop;
    (scroller(main, mainContents))({ target: { scrollTop: pos } });
    alignSections(mainContents);
  })
  
  // On scroll, call the scroller function.
  main.addEventListener('scroll', scroller(main, mainContents));

  // On navbar click, scroll to the section.
  navbarBreakpoints.forEach(params => {
    const main = document.getElementsByTagName('main')[0];
    const navDiv = document.getElementById(params[0]);
    console.log(params, params[0], navDiv)
    navDiv.onclick = () => {
      window.scrollTo(0, 0);
      main.scrollTo(0, params[1] + 0.5 * window.innerHeight + 1);
      window.scrollTo(0, 0);
    }
  })

  /****************************************************************************
   * FINALIZE
   ***************************************************************************/
  // Initialize sections alignment
  alignSections(mainContents);
  // Call the scroller function to initialize the `#main-contents` transform.
  (scroller(main, mainContents))({ target: { scrollTop: 0 } });
})