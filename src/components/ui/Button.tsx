import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const Button: React.FC<ButtonProps> = ({ label, onPress, variant = 'primary', style, disabled, icon }) => {
  const { theme } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const backgroundColor =
    variant === 'primary'
      ? theme.colors.primary
      : variant === 'danger'
      ? theme.colors.danger
      : variant === 'secondary'
      ? theme.colors.surfaceElevated
      : 'transparent';

  const textColor =
    variant === 'primary' || variant === 'danger' ? theme.colors.onPrimary : theme.colors.text;

  return (
    <AnimatedPressable
      disabled={disabled}
      onPressIn={() => (scale.value = withTiming(0.96, { duration: 100 }))}
      onPressOut={() => (scale.value = withTiming(1, { duration: 100 }))}
      onPress={onPress}
      style={[
        styles.base,
        { backgroundColor, opacity: disabled ? 0.5 : 1, borderRadius: theme.radius.md },
        variant === 'ghost' && { borderWidth: 1, borderColor: theme.colors.border },
        animatedStyle,
        style,
      ]}
    >
      {icon}
      <Text style={[styles.label, { color: textColor }, theme.typography.titleSm]}>{label}</Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  label: {
    textAlign: 'center',
  },
});
