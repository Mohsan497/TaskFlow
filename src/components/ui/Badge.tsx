import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface BadgeProps {
  label: string;
  tone?: 'success' | 'warning' | 'danger' | 'neutral';
}

export const Badge: React.FC<BadgeProps> = ({ label, tone = 'neutral' }) => {
  const { theme } = useTheme();

  const toneMap = {
    success: { bg: theme.colors.successBg, fg: theme.colors.success },
    warning: { bg: theme.colors.warningBg, fg: theme.colors.warning },
    danger: { bg: theme.colors.dangerBg, fg: theme.colors.danger },
    neutral: { bg: theme.colors.surfaceElevated, fg: theme.colors.textSecondary },
  }[tone];

  return (
    <View style={[styles.badge, { backgroundColor: toneMap.bg, borderRadius: theme.radius.pill }]}>
      <Text style={[styles.label, theme.typography.labelSm, { color: toneMap.fg }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  label: {
    textTransform: 'uppercase',
  },
});
