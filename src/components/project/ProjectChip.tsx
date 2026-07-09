import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface ProjectChipProps {
  label: string;
  color: string;
  active: boolean;
  onPress: () => void;
}

export const ProjectChip: React.FC<ProjectChipProps> = ({ label, color, active, onPress }) => {
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: active ? color : theme.colors.surfaceElevated,
          borderRadius: theme.radius.pill,
          borderColor: active ? color : theme.colors.border,
        },
      ]}
    >
      <Text
        style={[
          theme.typography.label,
          { color: active ? theme.colors.onPrimary : theme.colors.textSecondary, textTransform: 'uppercase' },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginRight: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
