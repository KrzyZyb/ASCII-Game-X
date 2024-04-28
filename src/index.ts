import Color from "./view/colors/Color";
import Layer, { DrawingOperation } from "./gameplay/Layer";
import Renderer from "./view/Renderer";
import Tile from "./objects/Tile";
import Vector from "./gameplay/Vector";
import Player from "./objects/actors/player/Player";
import Sight from "./gameplay/utils/Sight";

const WIDTH = 80;
const HEIGHT = 24;

const layers: Record<string, Layer> = {
  background: new Layer({ size: new Vector(WIDTH, HEIGHT) }),
  actor: new Layer({ size: new Vector(WIDTH, HEIGHT) }),
  objects: new Layer({size: new Vector(WIDTH, HEIGHT) })
};

export const player = new Player({
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

const objectTiles = [new Tile({
    char: '#',
    pos: new Vector(20, 15),
    isVisible: true,
    color: new Color(255, 0, 0)
  })];

const renderer = new Renderer();
renderer.setSize(35);
renderer.addLayer('background', layers.background);
renderer.addLayer('actor', layers.actor);
renderer.addLayer('objects', layers.objects);

renderer.onBeforeDraw(() => {
  let backgroundOperations = layers.background.operations;
  let objectsOperations = layers.objects.operations;
  Sight.renderFieldOfView(player, backgroundOperations, objectsOperations);
})


const draw = () => {
  backgroundTiles.forEach(tile => layers.background.draw(tile));
  objectTiles.forEach(object => layers.objects.draw(object));
  layers.actor.draw(player);
  renderer.commit();

  requestAnimationFrame(draw);
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
