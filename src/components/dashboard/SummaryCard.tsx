import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';

interface SummaryCardProps {
  value: number;
  label: string;
  accentColor?: string;
  delay?: number;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ value, label, accentColor, delay = 0 }) => {
  const { theme } = useTheme();
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(12);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 400 });
    translateY.value = withTiming(0, { duration: 400 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.radius.md,
          borderColor: theme.colors.border,
        },
        animatedStyle,
      ]}
    >
      <Text style={[theme.typography.displayLg, { color: accentColor ?? theme.colors.text }]}>{value}</Text>
      <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary, marginTop: 4 }]}>{label}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: '46%',
    padding: 18,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
