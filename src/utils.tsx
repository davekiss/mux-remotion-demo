import { interpolate } from 'remotion';

export const formatNumber = (i: number) => new Intl.NumberFormat().format(i);

export const getCurrentValue = (spring: number, endValue: number) => Math.ceil(interpolate(spring, [0, 1], [0, endValue], {
  extrapolateRight: "clamp",
}));