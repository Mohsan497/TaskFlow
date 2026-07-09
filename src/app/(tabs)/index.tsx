import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { useData } from '@/context/DataContext';
import { SummaryGrid } from '@/components/dashboard/SummaryGrid';
import { ProjectChip } from '@/components/project/ProjectChip';
import { TaskList } from '@/components/task/TaskList';
import { GlassView } from '@/components/ui/GlassView';
import { APP_NAME } from '@/constants';

export default function HomeScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { projects, tasksForProject, selectedProjectId, setSelectedProjectId, toggleTaskStatus, deleteTask, summary } =
    useData();

  const activeProject = projects.find((p) => p.id === selectedProjectId) ?? projects[0];
  const tasks = activeProject ? tasksForProject(activeProject.id) : [];

  const ListHeader = (
    <View style={styles.headerSection}>
      <GlassView style={{ marginBottom: 4 }}>
        <View style={styles.header}>
          <View>
            <Text style={[theme.typography.body, { color: theme.colors.textSecondary }]}>Welcome</Text>
            <Text style={[theme.typography.headline, { color: theme.colors.text }]}>{APP_NAME} ✨</Text>
          </View>
          <Pressable
            onPress={() => router.push('/task/new')}
            style={[styles.iconBtn, { backgroundColor: theme.colors.primary }]}
          >
            <Ionicons name="add" size={22} color={theme.colors.onPrimary} />
          </Pressable>
        </View>
      </GlassView>

      <Text style={[theme.typography.title, { color: theme.colors.text, marginTop: 24, marginBottom: 12 }]}>
        Summary
      </Text>
      <SummaryGrid stats={summary} />

      {projects.length > 0 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 28, marginBottom: 4 }}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {projects.map((p) => (
            <ProjectChip
              key={p.id}
              label={p.name}
              color={p.color}
              active={p.id === activeProject?.id}
              onPress={() => setSelectedProjectId(p.id)}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={styles.listWrapper}>
        <TaskList
  tasks={tasks}
  accentColor={activeProject?.color ?? theme.colors.primary}
  activeProjectId={activeProject?.id}
  onToggle={toggleTaskStatus}
  onEdit={(task) => router.push(`/task/${task.id}`)}
  onDelete={deleteTask}
  ListHeaderComponent={ListHeader}
/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  listWrapper: { flex: 1, paddingHorizontal: 20 },
  headerSection: { paddingTop: 12 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
