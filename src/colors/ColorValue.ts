import Color from "./Color";

export enum ColorValue {
  BLACK,
  WHITE,
  GREEN
};

export const colors: Record<ColorValue, Color> = {
  [ColorValue.WHITE]: new Color(255,255,255,1),
  [ColorValue.BLACK]: new Color(0,0,0,1),
  [ColorValue.GREEN]: new Color(0, 255, 0, 1)
};

export function getColorWithAlpha(color: ColorValue, alpha: number): Color {
  let pickedColor = colors[color];
  pickedColor.a = 100;
  return pickedColor;
}

