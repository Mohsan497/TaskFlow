import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';
import { projectColors } from '@/theme';
import { validateProjectName } from '@/utils/validators';

interface ProjectFormValues {
  name: string;
  description: string;
  color: string;
}

interface ProjectFormProps {
  initialValues?: Partial<ProjectFormValues>;
  onSubmit: (values: ProjectFormValues) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = 'Create Project',
}) => {
  const { theme } = useTheme();
  const [name, setName] = useState(initialValues?.name ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [color, setColor] = useState(initialValues?.color ?? projectColors[0]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    const validationError = validateProjectName(name);
    if (validationError) {
      setError(validationError);
      return;
    }
    onSubmit({ name: name.trim(), description: description.trim(), color });
  };

  return (
    <View>
      <Text style={[theme.typography.headline, { color: theme.colors.text, marginBottom: 16 }]}>
        {initialValues?.name ? 'Edit Project' : 'New Project'}
      </Text>

      <Input
        label="Project name"
        placeholder="e.g. Sports"
        value={name}
        onChangeText={(t) => {
          setName(t);
          setError(null);
        }}
        error={error}
      />

      <Input
        label="Description (optional)"
        placeholder="What is this project about?"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        style={{ minHeight: 70, textAlignVertical: 'top' }}
      />

      <Text style={[theme.typography.label, { color: theme.colors.textSecondary, marginBottom: 10 }]}>
        Accent color
      </Text>
      <View style={styles.colorRow}>
        {projectColors.map((c) => (
          <Pressable
            key={c}
            onPress={() => setColor(c)}
            style={[
              styles.swatch,
              { backgroundColor: c, borderWidth: color === c ? 3 : 0, borderColor: theme.colors.text },
            ]}
          />
        ))}
      </View>

      <View style={styles.actions}>
        <Button label="Cancel" variant="ghost" onPress={onCancel} style={{ flex: 1 }} />
        <Button label={submitLabel} variant="primary" onPress={handleSubmit} style={{ flex: 1 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  colorRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  swatch: { width: 32, height: 32, borderRadius: 16 },
  actions: { flexDirection: 'row', gap: 12 },
});
