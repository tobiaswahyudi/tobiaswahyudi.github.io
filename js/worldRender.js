/******************************************************************************
 * World Rendered - toby.wahyudi.ca / tobiaswahyudi.github.io
 * 
 * Benedict Tobias H. Wahyudi, November 2023
 *****************************************************************************/


/**********************************************
 * Helper for finding object offset placements
 **********************************************/

var ACTIVE_EDITING = units.trafficlight_perp;

document.addEventListener('keydown', function (event) {
  const key = event.key;
  if (!ACTIVE_EDITING) return;

  switch (event.key) {
    case "a":
      // Left pressed
      ACTIVE_EDITING.offset.x -= 1;
      break;
    case "d":
      // Right pressed
      ACTIVE_EDITING.offset.x += 1;
      break;
    case "w":
      // Up pressed
      ACTIVE_EDITING.offset.y -= 1;
      break;
    case "s":
      // Down pressed
      ACTIVE_EDITING.offset.y += 1;
      break;
  }
  console.log(ACTIVE_EDITING.offset);
});

// Helper for coin flip.

const coinFlip = (successWeight = 0.5) => Math.random() < successWeight;

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

const spawnAccessories = (unit, currentPos) => {
  if(unit == units.intersection) {
    accessoriesFront.push({...intersectionAccessories.trafficlight_double});
    accessoriesFront[accessoriesFront.length-1].pos = {...currentPos};
    if(coinFlip()) accessoriesFront.push({...intersectionAccessories.trafficlight_perp});
    accessoriesFront[accessoriesFront.length-1].pos = {...currentPos};
  } else if(unit == units.intersectionClose) {
    accessoriesFront.push({...intersectionAccessories.trafficlight_perp});
    accessoriesFront[accessoriesFront.length-1].pos = {...currentPos};
  } else if(unit == units.accessoryRoad) {
    if(coinFlip(0.6)) {
      accessoriesBack.push({...roadRightAccessories[Math.trunc(Math.random() * roadRightAccessories.length)]});
      accessoriesBack[accessoriesBack.length-1].pos = {...currentPos};
    }
    if(coinFlip(0.6)) {
      accessoriesFront.push({...roadLeftAccessories[Math.trunc(Math.random() * roadLeftAccessories.length)]});
      accessoriesFront[accessoriesFront.length-1].pos = {...currentPos};
    }
  } else if(unit == units.crossing) {
    if(coinFlip(0.8)) {
      accessoriesFront.push({...crossingAccessories[0]});
      accessoriesFront[accessoriesFront.length-1].pos = {...currentPos};
    }
  }
}

{
  let currentPos = {x: 0, y: 0};

  world.forEach(unit => {
    initUnit(unit);
    spawnAccessories(unit, currentPos);
    currentPos.x += unit.size.x;
    currentPos.y += unit.size.y;
  });

  console.log(accessoriesBack);
  console.log(accessoriesFront);

  accessoriesBack.forEach(unit => initUnit(unit));
  accessoriesFront.forEach(unit => initUnit(unit));
}

const taxicab = new Image();
taxicab.src = "img/world/people/taxicab.png";

/**********************************************
 * Main Render Loop
 **********************************************/

const renderWorld = (ctx, width, height, scrollTop) => {
  const currentHeight = scrollTop - 0.5 * height;

  // The world origin is located on this spot
  const origin = { x: 0.5 * width, y: 0.5 * height }

  let currentPos = { x: origin.x - currentHeight * Math.sqrt(3), y: origin.y - currentHeight };;

  world.forEach(unit => {
    ctx.drawImage(unit.img,
      currentPos.x + unit.offset.x,
      currentPos.y + unit.offset.y
    );
    currentPos.x += unit.size.x;
    currentPos.y += unit.size.y;
  })

  accessoriesBack.forEach(accessory => {
    ctx.drawImage(accessory.img,
      accessory.pos.x + accessory.offset.x + origin.x - currentHeight * Math.sqrt(3),
      accessory.pos.y + accessory.offset.y + origin.y - currentHeight
    );
  })

  ctx.globalAlpha = Math.max(0, Math.min((currentHeight - 430) / 250, 1));
  ctx.drawImage(taxicab, width / 2 - 32, height / 2 - 56);
  ctx.globalAlpha = 1;

  accessoriesFront.forEach(accessory => {
    ctx.drawImage(accessory.img,
      accessory.pos.x + accessory.offset.x + origin.x  - currentHeight * Math.sqrt(3),
      accessory.pos.y + accessory.offset.y + origin.y  - currentHeight
    );
  })
}