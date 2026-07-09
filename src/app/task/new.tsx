import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { useData } from '@/context/DataContext';
import { TaskForm, TaskFormValues } from '@/components/task/TaskForm';

export default function NewTaskScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { projectId } = useLocalSearchParams<{ projectId?: string }>();
  const { projects, addTask } = useData();

  const handleSubmit = async (values: TaskFormValues) => {
    await addTask(values);
    router.back();
  };

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={[styles.handle, { backgroundColor: theme.colors.border }]} />
        <TaskForm
          projects={projects}
          initialValues={projectId ? { projectId } : undefined}
          onSubmit={handleSubmit}
          onCancel={() => router.back()}
          submitLabel="Add Task"
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
