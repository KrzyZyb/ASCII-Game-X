
import Vector from "../../../gameplay/Vector";
import Color from "../../../view/colors/Color";
import Tile from "../../Tile";

export default class Player extends Tile {
  sightRange: number = 18;

  constructor(options: TileConstructorOptions) {
    super(options);
  }
}

interface TileConstructorOptions {
  char?: string;
  color?: Color;
  background?: Color;
  pos?: Vector;
  isVisible?: boolean;
};
