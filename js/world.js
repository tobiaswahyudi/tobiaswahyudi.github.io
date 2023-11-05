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
    offset: {x: -1, y: -1.7},
  },
  land: {
    src: "img/world/units/Land.svg",
    size: {x: 0, y: 0},
    offset: {x: 187, y: -45}
  },
  accessoryRoad: {
    src: "img/world/units/road.png",
    size: {x: 63, y: 36.5},
    offset: {x: 0, y: 0},
  }
}

const intersectionAccessories = {
  trafficlight_double : {
    src: "img/world/units/trafficlight_double.png",
    offset: {x: -118, y: -201}
  },
  trafficlight_perp : {
    src: "img/world/units/trafficlight_perp.png",
    offset: {x: -186, y: -143}
  },
}

const crossingAccessories = [
  {
    src: "img/world/units/trafficlight_single.png",
    offset: {x: 0, y: -123}
  },
]

const roadLeftAccessories = [
  {
    src: "img/world/units/bench.png",
    offset: {x: 0, y: 0}
  },
  {
    src: "img/world/units/lamp.png",
    offset: {x: 0, y: 0}
  },
  {
    src: "img/world/units/tree.png",
    offset: {x: 0, y: 0}
  },
  {
    src: "img/world/units/streetlight_l.png",
    offset: {x: 0, y: 0}
  },
]

const roadRightAccessories = [
  {
    src: "img/world/units/hydrant.png",
    offset: {x: 0, y: 0}
  },
  {
    src: "img/world/units/lamp.png",
    offset: {x: 0, y: 0}
  },
  {
    src: "img/world/units/tree.png",
    offset: {x: 0, y: 0}
  },
  {
    src: "img/world/units/streetlight_r.png",
    offset: {x: 0, y: 0}
  },
]

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
  units.accessoryRoad,
  units.accessoryRoad,
  units.accessoryRoad,
  units.accessoryRoad,
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
  units.accessoryRoad,
  units.accessoryRoad,
  units.accessoryRoad,
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
  units.accessoryRoad,
  units.accessoryRoad,
  units.accessoryRoad,
  units.accessoryRoad,
  units.accessoryRoad, 
  units.accessoryRoad,
  units.road,
  units.road,
  {
    src: "img/world/buildings/roadblock.png",
    size: {x: 0, y: 0},
    offset: {x: -78, y: -61}
  },
  units.road,
]

const accessoriesBack = [];
const accessoriesFront = [];