export const palette = {
  blue: '#3B82F6',
  green: '#22C55E',
  amber: '#F59E0B',
  red: '#EF4444',
  purple: '#A855F7',
  teal: '#14B8A6',
  pink: '#EC4899',
};

export const projectColors = [
  palette.blue,
  palette.purple,
  palette.teal,
  palette.pink,
  palette.amber,
  palette.green,
];

export const lightColors = {
  background: '#F4F6FA',
  surface: '#FFFFFF',
  surfaceGlass: 'rgba(255,255,255,0.6)',
  surfaceElevated: '#FFFFFF',
  primary: palette.blue,
  onPrimary: '#FFFFFF',
  text: '#12161C',
  textSecondary: '#5B6472',
  textMuted: '#8A93A2',
  border: 'rgba(18,22,28,0.08)',
  success: palette.green,
  successBg: 'rgba(34,197,94,0.12)',
  warning: palette.amber,
  warningBg: 'rgba(245,158,11,0.14)',
  danger: palette.red,
  dangerBg: 'rgba(239,68,68,0.12)',
  tabActive: palette.blue,
  tabInactive: '#9AA3B2',
  overlay: 'rgba(10,14,20,0.35)',
  statusBar: 'dark' as const,
};

export const darkColors = {
  background: '#0B0F14',
  surface: '#151B23',
  surfaceGlass: 'rgba(255,255,255,0.06)',
  surfaceElevated: '#1C232C',
  primary: '#5B9BFF',
  onPrimary: '#0B0F14',
  text: '#F2F4F7',
  textSecondary: '#A7B0BE',
  textMuted: '#6C7684',
  border: 'rgba(255,255,255,0.08)',
  success: '#34D399',
  successBg: 'rgba(52,211,153,0.14)',
  warning: '#FBBF24',
  warningBg: 'rgba(251,191,36,0.14)',
  danger: '#F87171',
  dangerBg: 'rgba(248,113,113,0.14)',
  tabActive: '#5B9BFF',
  tabInactive: '#5C6572',
  overlay: 'rgba(0,0,0,0.55)',
  statusBar: 'light' as const,
};

export type AppColors = typeof lightColors;
