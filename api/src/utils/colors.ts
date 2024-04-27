function hexColorToInt(color: string): number {
  color = color.replace('#', '');
  return parseInt(color, 16);
}

function intColorToRGB(color: number): {r: number, g: number, b: number} {
  return {
    r: (color & 0xff0000) >> 16,
    g: (color & 0x00ff00) >> 8,
    b: color & 0x0000ff
  };
}

function hexColorToRGB(color: string): {r: number, g: number, b: number} {
  const intClr = hexColorToInt(color);
  return intColorToRGB(intClr);
}

function intColorToHex(color: number): string {
  const r = ((color & 0xff0000) >> 16).toString(16).padStart(2, '0');
  const g = ((color & 0x00ff00) >> 8).toString(16).padStart(2, '0');
  const b = (color & 0x0000ff).toString(16).padStart(2, '0');
  return '#'+r+g+b;
}

export { hexColorToInt, intColorToRGB, hexColorToRGB, intColorToHex }
