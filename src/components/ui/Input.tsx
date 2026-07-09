import React from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface InputProps extends TextInputProps {
  label: string;
  error?: string | null;
}

export const Input: React.FC<InputProps> = ({ label, error, style, ...rest }) => {
  const { theme } = useTheme();

  return (
    <View style={styles.wrapper}>
      <Text style={[theme.typography.label, { color: theme.colors.textSecondary, marginBottom: 6 }]}>
        {label}
      </Text>
      <TextInput
        placeholderTextColor={theme.colors.textMuted}
        style={[
          styles.input,
          theme.typography.body,
          {
            color: theme.colors.text,
            backgroundColor: theme.colors.surfaceElevated,
            borderRadius: theme.radius.sm,
            borderColor: error ? theme.colors.danger : theme.colors.border,
          },
          style,
        ]}
        {...rest}
      />
      {error ? (
        <Text style={[theme.typography.bodySm, { color: theme.colors.danger, marginTop: 4 }]}>{error}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
