const CELL_SIZE = 24;

const TIME_FACTOR = 0.0001;
const SPACE_FACTOR = 0.27;

const letters = [
  ["-", "×", "X"],
  ["∘", "⚪︎", "O"],
];

const colors = ["#a0a0a0", "#444444", "#d4d4d4"];
const backgroundColor = "#ececec";

const canvas = document.getElementById("shimmer");
const ctx = canvas.getContext("2d");
ctx.font = "bold 12px 'M PLUS Rounded 1c', sans-serif";
ctx.textAlign = "left";

let updateInterval = undefined;

const setShimmer = () => {
  console.log("setShimmer");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let numCols = Math.floor(canvas.width / CELL_SIZE);
  let numRows = Math.floor(canvas.height / CELL_SIZE);

  const colMajorOffset = (numCols - 1) % 3;
  const rowMajorOffset = (numRows - 1) % 3;

  // Make symmetric
  numCols += colMajorOffset;
  numRows += rowMajorOffset;

  const colOffset = (canvas.width - numCols * CELL_SIZE) / 2;
  const rowOffset = (canvas.height - numRows * CELL_SIZE) / 2;

  const drawShimmer = () => {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "none";

    const timeNow = Date.now();

    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numCols; col++) {
        const val =
          (noise.perlin3(
            col * SPACE_FACTOR,
            row * SPACE_FACTOR,
            timeNow * TIME_FACTOR,
          ) +
            1) /
          2;
        const lum = Math.floor(val * 3);
        if (
          lum == 1 &&
          (row % 3 != rowMajorOffset || col % 3 != colMajorOffset)
        )
          continue;
        const letter = letters[(row + col) % 2][lum];
        // ctx.fillStyle = '#ff0000'
        if (row % 3 != rowMajorOffset || col % 3 != colMajorOffset) {
          ctx.fillStyle = colors[lum] + "15";
          ctx.fillRect(
            col * CELL_SIZE + colOffset,
            row * CELL_SIZE + rowOffset,
            CELL_SIZE,
            CELL_SIZE,
          );
        }
        ctx.fillStyle = colors[lum];
        ctx.fillText(
          letter,
          col * CELL_SIZE + colOffset + 6,
          row * CELL_SIZE + rowOffset + 6,
        );
      }
    }
  };

  if (updateInterval) {
    clearInterval(updateInterval);
  }
  updateInterval = setInterval(drawShimmer, 1000 / 60);
};

setShimmer();
// window.addEventListener("resize", setShimmer);
