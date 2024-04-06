import Color from "./Color";
import Layer, { DrawingOperation } from "./Layer";
import Renderer from "./Renderer";
import Tile from "./Tile";
import Vector from "./Vector";

const WIDTH = 80;
const HEIGHT = 24;

const layers: Record<string, Layer> = {
  background: new Layer({ size: new Vector(WIDTH, HEIGHT) }),
  actor: new Layer({ size: new Vector(WIDTH, HEIGHT) }),
};

const player = new Tile({
  background: new Color(0,0,0,0),
  char: '@',
  color: new Color(255, 0, 0),
  isVisible: true,
  pos: Vector.Zero()
});

const backgroundTiles = Array.from({ length: WIDTH*HEIGHT }, (_, i) => {
  const x = i % WIDTH;1
  const y = Math.floor(i / WIDTH);

  return new Tile({
    char: '.',
    pos: new Vector(x, y)
  });
});

const renderer = new Renderer();
renderer.setSize(35);
renderer.addLayer('background', layers.background);
renderer.addLayer('actor', layers.actor);


// renderer.onBeforeDraw(() => {
//   layers.background.operations.forEach(op => {
//     const newAlpha = (Math.sin(op.pos.x / op.pos.y + renderer.frames/10) + 1) / 2;
//     op.color.a = newAlpha;
//   })
// })

renderer.onBeforeDraw(() => {
  let pos = player.pos;
  console.log(pos)
  let cellsInRadiusCoordinates = getAllCellsInRadius(pos);
  let filteredCells = filterCells(layers.background.operations, cellsInRadiusCoordinates)
  filteredCells.forEach(op => {
      op.color = new Color(0, 255, 0, 1);
  })
})


const draw = () => {
  backgroundTiles.forEach(tile => layers.background.draw(tile));
  layers.actor.draw(player);
  renderer.commit();

  requestAnimationFrame(draw);
}

function filterCells(op: Array<DrawingOperation>, cellsInRadius: Vector[]):Array<DrawingOperation>{
  let matches = new Array<DrawingOperation>();
  op.forEach(element => {
    cellsInRadius.forEach(cellInRadius => {
      if(element.pos.x === cellInRadius.x && element.pos.y === cellInRadius.y){
        console.log(matches);
        matches.push(element);
      }
    });
  })
  return matches;
}

// function getAllCellsInRadius(playerPosition: Vector): Vector[] {
//   const radius = 9;
//   const cells: Vector[] = [];

//   for (let xOffset = -radius; xOffset <= radius; xOffset++) {
//       for (let yOffset = -radius; yOffset <= radius; yOffset++) {
//           const newX = playerPosition.x + xOffset;
//           const newY = playerPosition.y + yOffset;

//           // Calculate the distance between the player position and the current cell
//           const distance = Math.sqrt(xOffset ** 2 + yOffset ** 2);

//           // If the distance is within the radius, add the cell to the result
//           if (distance <= radius) {
//               cells.push(new Vector(newX, newY));
//           }
//       }
//   }

//   return cells;
// }

function getAllCellsInRadius(playerPosition: Vector): Vector[] {
  const radius = 9;
  const cells: Vector[] = [];
  cells.push(new Vector(playerPosition.x, playerPosition.y+1));
  cells.push(new Vector(playerPosition.x, playerPosition.y-1));
  cells.push(new Vector(playerPosition.x+1, playerPosition.y+1));
  cells.push(new Vector(playerPosition.x+1, playerPosition.y-1));
  cells.push(new Vector(playerPosition.x-1, playerPosition.y+1));
  cells.push(new Vector(playerPosition.x-1, playerPosition.y-1));
  cells.push(new Vector(playerPosition.x+1, playerPosition.y));
  cells.push(new Vector(playerPosition.x-1, playerPosition.y));
  cells.push(new Vector(playerPosition.x, playerPosition.y));

  return cells;
}

function isInRadious(checkedCell: Vector, cellsInRadius: Vector[]): boolean {
  cellsInRadius.forEach(cell => {
    return (checkedCell.x === cell.x && checkedCell.y === cell.y);
  });
  return false;
}

draw();

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowUp': {
      player.pos.add(new Vector(0, -1));
      break;
    }
    case 'ArrowDown': {
      player.pos.add(new Vector(0, 1));
      break;
    }
    case 'ArrowLeft': {
      player.pos.add(new Vector(-1, 0));
      break;
    }
    case 'ArrowRight': {
      player.pos.add(new Vector(1, 0));
      break;
    }
  }
})