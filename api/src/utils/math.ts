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