import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { useData } from '@/context/DataContext';
import { TaskList } from '@/components/task/TaskList';

export default function ProjectDetailScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { projects, tasksForProject, toggleTaskStatus, deleteTask } = useData();

  const project = projects.find((p) => p.id === id);
  const tasks = project ? tasksForProject(project.id) : [];

  if (!project) {
    return (
      <SafeAreaView style={[styles.flex, { backgroundColor: theme.colors.background }]}>
        <Text style={{ color: theme.colors.text, padding: 20 }}>Project not found.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} hitSlop={10} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
        </Pressable>
        <Pressable
onPress={() =>
  router.push({
    pathname: '/task/new',
    params: {
      projectId: project.id,
    },
  })
}          style={[styles.iconBtn, { backgroundColor: theme.colors.primary }]}
        >
          <Ionicons name="add" size={20} color={theme.colors.onPrimary} />
        </Pressable>
      </View>

      <View style={styles.titleBlock}>
        <Text style={[theme.typography.displayLg, { color: theme.colors.text }]}>{project.name.toUpperCase()}</Text>
        <Text style={[theme.typography.body, { color: theme.colors.textSecondary, marginTop: 8 }]}>
          {project.description?.trim()
            ? project.description
            : 'Manage all tasks in this project. Add, edit, or mark tasks complete to track your progress.'}
        </Text>
      </View>

      <View style={{ flex: 1, paddingHorizontal: 20 }}>
       <TaskList
  tasks={tasks}
  accentColor={project.color}
  activeProjectId={project.id}
  onToggle={toggleTaskStatus}
  onEdit={(task) => router.push(`/task/${task.id}`)}
  onDelete={deleteTask}
/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  backBtn: { padding: 4 },
  iconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleBlock: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 24 },
});
