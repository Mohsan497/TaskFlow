import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';
import { Project } from '@/types';
import { validateTaskTitle } from '@/utils/validators';
import { toISODate, formatDate, nowTimeString } from '@/utils/dateHelpers';

export interface TaskFormValues {
  title: string;
  description: string;
  projectId: string;
  dueDate: string;
  dueTime: string;
}

interface TaskFormProps {
  projects: Project[];
  initialValues?: Partial<TaskFormValues>;
  onSubmit: (values: TaskFormValues) => void;
  onCancel: () => void;
  submitLabel?: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  projects,
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = 'Add Task',
}) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [description, setDescription] = useState(initialValues?.description ?? '');
  const [projectId, setProjectId] = useState(initialValues?.projectId ?? projects[0]?.id ?? '');
  const [dueDate, setDueDate] = useState(initialValues?.dueDate ?? toISODate(new Date()));
  const [dueTime, setDueTime] = useState(initialValues?.dueTime ?? nowTimeString());
  const [error, setError] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleSubmit = () => {
    const validationError = validateTaskTitle(title);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (!projectId) {
      setError('Please select a project');
      return;
    }
    onSubmit({ title: title.trim(), description: description.trim(), projectId, dueDate, dueTime });
  };

  return (
    <View>
      <Text style={[theme.typography.headline, { color: theme.colors.text, marginBottom: 16 }]}>
        {initialValues?.title ? 'Edit Task' : 'New Task'}
      </Text>

      <Input
        label="Title"
        placeholder="e.g. Task Name"
        value={title}
        onChangeText={(t) => {
          setTitle(t);
          setError(null);
        }}
        error={error}
      />

      <Input
        label="Description (optional)"
        placeholder="Add details..."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        style={{ minHeight: 70, textAlignVertical: 'top' }}
      />

      <Text style={[theme.typography.label, { color: theme.colors.textSecondary, marginBottom: 10 }]}>
        Project
      </Text>
      <View style={styles.projectRow}>
        {projects.map((p) => (
          <Pressable
            key={p.id}
            onPress={() => setProjectId(p.id)}
            style={[
              styles.projectChip,
              {
                backgroundColor: projectId === p.id ? p.color : theme.colors.surfaceElevated,
                borderRadius: theme.radius.pill,
              },
            ]}
          >
            <Text
              style={[
                theme.typography.label,
                { color: projectId === p.id ? theme.colors.onPrimary : theme.colors.textSecondary },
              ]}
            >
              {p.name}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.dateTimeRow}>
        <Pressable
          onPress={() => setShowDatePicker(true)}
          style={[styles.dateBtn, { backgroundColor: theme.colors.surfaceElevated, borderRadius: theme.radius.sm }]}
        >
          <Ionicons name="calendar-outline" size={16} color={theme.colors.textSecondary} />
          <Text style={[theme.typography.bodySm, { color: theme.colors.text }]}>{formatDate(dueDate)}</Text>
        </Pressable>
        <Pressable
          onPress={() => setShowTimePicker(true)}
          style={[styles.dateBtn, { backgroundColor: theme.colors.surfaceElevated, borderRadius: theme.radius.sm }]}
        >
          <Ionicons name="time-outline" size={16} color={theme.colors.textSecondary} />
          <Text style={[theme.typography.bodySm, { color: theme.colors.text }]}>{dueTime}</Text>
        </Pressable>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={new Date(dueDate)}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(_, selected) => {
            setShowDatePicker(Platform.OS === 'ios');
            if (selected) setDueDate(toISODate(selected));
          }}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={(() => {
            const [h, m] = dueTime.split(':').map(Number);
            const d = new Date();
            d.setHours(h || 0, m || 0);
            return d;
          })()}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, selected) => {
            setShowTimePicker(Platform.OS === 'ios');
            if (selected) {
              const h = `${selected.getHours()}`.padStart(2, '0');
              const m = `${selected.getMinutes()}`.padStart(2, '0');
              setDueTime(`${h}:${m}`);
            }
          }}
        />
      )}

      <View style={[styles.actions, { marginTop: 24 }]}>
        <Button label="Cancel" variant="ghost" onPress={onCancel} style={{ flex: 1 }} />
        <Button label={submitLabel} variant="primary" onPress={handleSubmit} style={{ flex: 1 }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  projectRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  projectChip: { paddingVertical: 8, paddingHorizontal: 14 },
  dateTimeRow: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  dateBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  actions: { flexDirection: 'row', gap: 12 },
});
