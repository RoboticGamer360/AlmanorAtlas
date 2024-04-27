import { Injectable } from "@angular/core";

declare global {
  interface Math {
    avg: (...values: number[]) => number;
    map: (
      inputFrom: number,
      inputTo: number,
      outputFrom: number,
      outputTo: number,
      value: number,
      clamp?: boolean
    ) => number;
    roundTo: (x: number, decimals: number) => number;
    sum: (...values: number[]) => number;
  }
}

@Injectable({
  providedIn: 'root'
}) export class UtilsService {
  constructor () {
    Math.avg = (...values: number[]): number => {
      if (values.length < 1) return NaN;
      return values.reduce((acc, cur) => acc + cur, 0) / values.length;
    }

    Math.map = (
      inputFrom: number,
      inputTo: number,
      outputFrom: number,
      outputTo: number,
      value: number,
      clamp?: boolean
    ): number => {
      const slope = (outputTo - outputFrom) / ( inputTo - inputFrom);
      const output = slope * (value - inputFrom) + outputFrom;

      if (!clamp) return output;

      // Handle clamping
      if (slope > 0) {
        if (output > outputTo) return outputTo;
        if (output < outputFrom) return outputFrom;
      }

      if (slope < 0) {
        if (output > outputFrom) return outputFrom;
        if (output < outputTo) return outputTo;
      }

      return output;
    }

    Math.roundTo = (x: number, decimals?: number): number => {
      decimals ??= 0;
      const modifier = Math.pow(10, decimals);
      return Math.round(x * modifier) / modifier;
    }

    Math.sum = (...values: number[]): number => {
      if (values.length === 0) return NaN;
      return values.reduce((cur, acc) => cur + acc, 0);
    }
  }

  hexColorToInt(color: string): number {
    color = color.replace('#', '');
    return parseInt(color, 16);
  }

  intColorToRGB(color: number): {r: number, g: number, b: number} {
    return {
      r: (color & 0xff0000) >> 16,
      g: (color & 0x00ff00) >> 8,
      b: color & 0x0000ff
    };
  }

  hexColorToRGB(color: string): {r: number, g: number, b: number} {
    const intClr = this.hexColorToInt(color);
    return this.intColorToRGB(intClr);
  }

  bgColorOf(color: string): string {
    const rgb = this.hexColorToRGB(color);
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.15)`;
  }
}
