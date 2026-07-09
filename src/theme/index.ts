import { lightColors, darkColors, projectColors, palette } from './colors';
import { typography } from './typography';
import { spacing, radius } from './spacing';

export const buildTheme = (mode: 'light' | 'dark') => ({
  mode,
  colors: mode === 'dark' ? darkColors : lightColors,
  typography,
  spacing,
  radius,
});

export type AppTheme = ReturnType<typeof buildTheme>;

export { projectColors, palette };
