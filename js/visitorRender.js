// Radius is misleading, it's a square
const VISITOR_WANDER_RADIUS = 50;
const VISITOR_MOVE_SPEED = 0.5;
// This affects how bouncy the visitors walk. Lower is more bouncy
const VISITOR_BOUNCE_COEFFICIENT = 32;

const VISITOR_EDITING = 0;

const visitorImg = (fill, stroke) => `
<svg width="15" height="44" viewBox="0 0 15 44" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M6.1859 32.4524L5.75288 32.2024V32.7024V39.8214L2.49498 37.9405V30.8214V30.3214L2.06197 30.0714L0.433013 29.131V16.2976C0.433013 12.9783 3.29549 11.7836 7.01068 13.9286C10.7259 16.0735 13.5884 20.5735 13.5884 23.8929V36.7262L11.9594 35.7857L11.5264 35.5357V36.0357V43.1548L8.26848 41.2738V34.1548V33.6548L7.83547 33.4048L6.1859 32.4524ZM7.01068 12.9286C4.28897 11.3572 2.08258 7.53562 2.08258 4.39286C2.08258 1.25009 4.28897 -0.0237626 7.01068 1.54762C9.73239 3.119 11.9388 6.94057 11.9388 10.0833C11.9388 13.2261 9.73239 14.5 7.01068 12.9286Z"
    fill="${fill}"
    stroke="${stroke}"
  />
</svg>
`

const initializeVisitor = (visitor) => {
  visitor.img = new Image();
  visitor.img.src = `data:image/svg+xml;base64,${window.btoa(visitorImg(visitor.fill, visitor.stroke))}`;

  visitor.anchor = {...visitor.pos};
  visitor.target = {...visitor.pos};
  visitor.realLocation = {...visitor.pos};
  visitor.moveTicks = 0;
  visitor.bouncePeriod = 0;
}

visitors.forEach(initializeVisitor);

const randomMoveVisitor = (visitor) => {
  if(visitor.target.x == visitor.realLocation.x && visitor.target.y == visitor.realLocation.y) {
    if(coinFlip(0.01)) {
      const x = 2 * Math.random() - 1;
      const y = 2 * Math.random() - 1;

      const dx = VISITOR_WANDER_RADIUS * (x + y) * Math.sqrt(3);
      const dy = VISITOR_WANDER_RADIUS * (y - x);

      visitor.target = {x: visitor.anchor.x + dx, y: visitor.anchor.y + dy};
      visitor.moveTicks = 0;

      const distToTarget = Math.hypot(visitor.target.x - visitor.realLocation.x, visitor.target.y - visitor.realLocation.y);
      // How many ticks to complete?
      const ticksToMove = distToTarget / VISITOR_MOVE_SPEED;
      visitor.bouncePeriod = ticksToMove / Math.max(1, Math.round(ticksToMove / VISITOR_BOUNCE_COEFFICIENT));
    }
  } else {
    const distToTarget = Math.hypot(visitor.target.x - visitor.realLocation.x, visitor.target.y - visitor.realLocation.y);

    if(distToTarget < VISITOR_MOVE_SPEED) {
      visitor.realLocation.x = visitor.target.x;
      visitor.realLocation.y = visitor.target.y;
      visitor.pos.x = visitor.target.x;
      visitor.pos.y = visitor.target.y;
      visitor.moveTicks = 0;
    } else {
      const scaleFactor = VISITOR_MOVE_SPEED / distToTarget;
      const bounceTick = visitor.moveTicks / visitor.bouncePeriod * 2 * Math.PI;

      visitor.realLocation.x += (visitor.target.x - visitor.realLocation.x) * scaleFactor;
      visitor.realLocation.y += (visitor.target.y - visitor.realLocation.y) * scaleFactor;
      visitor.pos.x = visitor.realLocation.x;
      visitor.pos.y = visitor.realLocation.y - 3 * Math.sqrt(Math.abs(Math.sin(bounceTick)));
      visitor.moveTicks++;
    }
  }
}

const drawVisitor = (ctx, xOffset, yOffset, visitor) => {
  ctx.drawImage(visitor.img,
    visitor.pos.x + xOffset,
    visitor.pos.y + yOffset
  );

  // ctx.strokeStyle = visitor.fill;
  // ctx.fillStyle = visitor.fill;

  // ctx.beginPath(); 
  // ctx.arc(visitor.pos.x + xOffset, visitor.pos.y + yOffset, 1, 0, Math.PI * 2);
  // ctx.closePath();
  // ctx.fill();

  // ctx.lineWidth = 1;
  // ctx.beginPath();
  // ctx.moveTo(xOffset + visitor.anchor.x - 2 * VISITOR_WANDER_RADIUS * Math.sqrt(3), visitor.anchor.y + yOffset);
  // ctx.lineTo(xOffset + visitor.anchor.x, visitor.anchor.y + 2 * VISITOR_WANDER_RADIUS + yOffset);
  // ctx.lineTo(xOffset + visitor.anchor.x + 2 * VISITOR_WANDER_RADIUS * Math.sqrt(3), visitor.anchor.y + yOffset);
  // ctx.lineTo(xOffset + visitor.anchor.x, visitor.anchor.y - 2 * VISITOR_WANDER_RADIUS + yOffset);
  // ctx.lineTo(xOffset + visitor.anchor.x - 2 * VISITOR_WANDER_RADIUS * Math.sqrt(3), visitor.anchor.y + yOffset);
  // ctx.closePath();
  // ctx.stroke();
}

const drawVisitorText = (ctx, xOffset, yOffset, visitor) => {
  ctx.fillStyle = 'white' ;
  ctx.textAlign = "center";
  ctx.font = '200 15px Kanit' ;
  ctx.transform(1, 0, 0, 1,
    visitor.pos.x + 8 + xOffset,
    visitor.pos.y - 25 + yOffset
  );
  ctx.transform(1, 0.6, 0, 1, 0, 0);
  ctx.fillText (visitor.name, 0, 0);
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  ctx.font = '200 10px Kanit' ;
  ctx.transform(1, 0, 0, 1,
    visitor.pos.x + 8 + xOffset,
    visitor.pos.y - 10 + yOffset
  );
  ctx.transform(1, 0.6, 0, 1, 0, 0);
  ctx.fillText (visitor.title, 0, 0);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('colorpicker-fill').oninput = e => {
    visitors[VISITOR_EDITING].fill = e.target.value;
    initializeVisitor(visitors[VISITOR_EDITING]);
  }

  document.getElementById('colorpicker-stroke').oninput = e => {
    visitors[VISITOR_EDITING].stroke = e.target.value;
    initializeVisitor(visitors[VISITOR_EDITING]);
  }
})