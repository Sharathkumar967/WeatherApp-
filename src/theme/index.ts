export * from './colors';
export * from './spacing';

import { colors } from './colors';
import { spacing, borderRadius, elevation, fontSize, lineHeight } from './spacing';

export const theme = {
  colors,
  spacing,
  borderRadius,
  elevation,
  fontSize,
  lineHeight,
};

export type Theme = typeof theme;