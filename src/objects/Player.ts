
import Vector from "../Vector";
import Color from "../colors/Color";
import { colors, ColorValue } from "../colors/ColorValue";
import Tile from "./Tile";

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
