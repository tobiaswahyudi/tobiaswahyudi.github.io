const WIDTH_CONST = 0.39;
const HEIGHT_CONST = -0.25;

let WIDTH = 0;
let HEIGHT = 0;

document.addEventListener('DOMContentLoaded',() => {
  const main = document.getElementsByTagName('main')[0];
  const mainContents = document.getElementById('main-contents');

  WIDTH = main.offsetWidth;
  HEIGHT = main.offsetHeight;

  console.log({WIDTH, HEIGHT})

  console.log({main, mainContents})

  const scroller = (e) => {
    console.log(e.target.scrollTop);

    const pos = e.target.scrollTop;

    const x0 = WIDTH_CONST * WIDTH;
    const y0 = HEIGHT_CONST * HEIGHT;

    const dx = -1.422 * pos;
    const dy = -pos;

    mainContents.style.transform =
    `matrix3d(
      0.71, -0.5, 0.5, 0,
      0.71, 0.5, -0.5, 0,
      0, 0.71, 0.71, 0,
      ${x0 + dx}, ${y0 + dy}, 0, 1
    )`
  }

  main.addEventListener('scroll', scroller);

  scroller({target: {scrollTop: 0}});
})

385, -252.5