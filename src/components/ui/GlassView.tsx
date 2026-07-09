import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '@/hooks/useTheme';

interface GlassViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
}

/**
 * A frosted glassmorphism container. Uses native blur where supported,
 * and gracefully falls back to a translucent surface elsewhere (e.g. Android software renderers).
 */
export const GlassView: React.FC<GlassViewProps> = ({ children, style, intensity = 40 }) => {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.wrapper,
        {
          borderRadius: theme.radius.lg,
          borderColor: theme.colors.border,
          backgroundColor: theme.colors.surfaceGlass,
        },
        style,
      ]}
    >
      <BlurView
        intensity={Platform.OS === 'android' ? intensity * 0.6 : intensity}
        tint={theme.mode === 'dark' ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
  },
});
