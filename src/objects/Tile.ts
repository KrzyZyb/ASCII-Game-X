import Color from "../colors/Color";
import { ColorValue, colors } from "../colors/ColorValue";
import Vector from "../Vector";

interface TileConstructorOptions {
  char?: string;
  color?: Color;
  background?: Color;
  pos?: Vector;
  isVisible?: boolean;
};

export default class Tile {
  char: string;
  color: Color;
  background: Color;
  pos: Vector;
  isVisible: boolean;

  readonly id: string = Math.random().toString(36).slice(2);

  constructor(options: TileConstructorOptions) {
    this.char = options.char || ' ';
    this.color = options.color || colors[ColorValue.BLACK];
    this.background = options.background || new Color(0, 0, 0, 1);
    this.pos = options.pos || new Vector(0, 0);
    this.isVisible = options.isVisible || true;
  }
}
