import { TextStyle } from 'react-native';

type TypeScale = Record<
  'displayLg' | 'headline' | 'title' | 'titleSm' | 'body' | 'bodySm' | 'label' | 'labelSm',
  TextStyle
>;

export const typography: TypeScale = {
  displayLg: { fontSize: 28, fontWeight: '800', letterSpacing: -0.5 },
  headline: { fontSize: 22, fontWeight: '800', letterSpacing: -0.3 },
  title: { fontSize: 18, fontWeight: '700' },
  titleSm: { fontSize: 15, fontWeight: '700' },
  body: { fontSize: 15, fontWeight: '400' },
  bodySm: { fontSize: 13, fontWeight: '400' },
  label: { fontSize: 13, fontWeight: '600' },
  labelSm: { fontSize: 11, fontWeight: '700', letterSpacing: 0.4 },
};
