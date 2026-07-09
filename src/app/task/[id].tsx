import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { useData } from '@/context/DataContext';
import { TaskForm, TaskFormValues } from '@/components/task/TaskForm';

export default function EditTaskScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, projects, updateTask } = useData();

  const task = tasks.find((t) => t.id === id);

  const handleSubmit = async (values: TaskFormValues) => {
    if (task) await updateTask(task.id, values);
    router.back();
  };

  if (!task) {
    return (
      <SafeAreaView style={[styles.flex, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.text, padding: 20 }}>Task not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={[styles.handle, { backgroundColor: theme.colors.border }]} />
        <TaskForm
          projects={projects}
          initialValues={task}
          onSubmit={handleSubmit}
          onCancel={() => router.back()}
          submitLabel="Save Changes"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 20 },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: 16,
  },
});
