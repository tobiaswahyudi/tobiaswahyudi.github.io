/**
 * @typedef XY
 * @type {object}
 * @property {x}
 * @property {y}
 */

/**
 * @typedef Unit
 * @type {object}
 * @property {string} src - the image src address.
 * @property {XY} size - how much the cursor shifts by after drawing this unit.
 * @property {XY} offset - adjustment from the cursor for image placement.
 */

/** @type {Map<String, Unit>} */
const units = {
  road: {
    src: "img/world/units/road.png",
    size: {x: 63, y: 36.5},
    offset: {x: 0, y: 0}
  },
  accessoryRoad: {
    src: "img/world/units/road.png",
    size: {x: 63, y: 36.5},
    offset: {x: 0, y: 0},
    accessorize: true,
  },
  crossing: {
    src: "img/world/units/crossing.png",
    size: {x: 63, y: 36.3},
    offset: {x: 0, y: -.3}
  },
  roundabout: {
    src: "img/world/units/roundabout.png",
    size: {x: 261.45, y: 149.4},
    offset: {x: 0, y: 0}
  },
  intersection: {
    src: "img/world/units/intersection.png",
    size: {x: 225, y: 129},
    offset: {x: -1, y: -1.7}
  },
  land: {
    src: "img/world/units/Land.svg",
    size: {x: 0, y: 0},
    offset: {x: 187, y: -45}
  }
}

const world = [
  {
    src: "img/world/buildings/transition1.png",
    size: {x: 532.5, y: 278},
    offset: {x: 0, y: 0}
  },
  {
    src: "img/world/units/roundabout.png",
    size: {x: 0, y: 0},
    offset: {x: 0, y: 0}
  },
  {
    src: "img/world/buildings/E7.png",
    size: {x: 261.45, y: 149.4},
    offset: {x: -65, y: -433}
  },
  units.road,
  units.road,
  {
    src: "img/world/buildings/workSign.png",
    size: {x: 0, y: 0},
    offset: {x: -10, y: -280}
  },
  units.road,
  units.road,
  units.road,
  units.crossing,
  units.road,
  units.road,
  units.road,
  units.road,
  units.land,
  units.intersection,
  {
    src: "img/world/buildings/Splunk.png",
    size: {x: 0, y: 0},
    offset: {x: 3, y: -270}
  },
  units.road,
  units.road,
  units.road,
  units.road,
  units.road,
  units.intersection,
  units.road,
  units.road,
  units.road,
  units.land,
  units.intersection,
  {
    src: "img/world/buildings/L6.png",
    size: {x: 0, y: 0},
    offset: {x: 57, y: -339}
  },
  units.road,
  units.road,
  units.road,
  units.road,
  units.road,
  units.intersection,
  units.road,
  units.road,
  units.road,
  units.road,
  units.road, 
  units.road,
  units.road,
  units.road,
  {
    src: "img/world/buildings/roadblock.png",
    size: {x: 0, y: 0},
    offset: {x: -78, y: -61}
  },
  units.road,
]