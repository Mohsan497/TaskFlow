import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList, Alert,Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/hooks/useTheme';
import { useData, nextProjectColor } from '@/context/DataContext';
import { ProjectCard } from '@/components/project/ProjectCard';
import { ProjectForm } from '@/components/project/ProjectForm';
import { AppModal } from '@/components/ui/Modal';
import { Project } from '@/types';

export default function ProjectsScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const { projects, tasksForProject, addProject, updateProject, deleteProject } = useData();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const openCreate = () => {
    setEditingProject(null);
    setModalVisible(true);
  };

  const openEdit = (project: Project) => {
    setEditingProject(project);
    setModalVisible(true);
  };

  const handleSubmit = async (values: { name: string; description: string; color: string }) => {
    if (editingProject) {
      await updateProject(editingProject.id, values);
    } else {
      await addProject(values);
    }
    setModalVisible(false);
  };


const handleDelete = (project: Project) => {
  if (Platform.OS === 'web') {
    const confirmed = window.confirm(`Delete "${project.name}"? All its tasks will be removed.`);
    if (confirmed) deleteProject(project.id);
  } else {
    Alert.alert('Delete project?', `"${project.name}" and all its tasks will be removed.`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteProject(project.id) },
    ]);
  }
};

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={styles.header}>
        <Text style={[theme.typography.headline, { color: theme.colors.text }]}>Projects</Text>
        <Pressable
          onPress={openCreate}
          style={[styles.iconBtn, { backgroundColor: theme.colors.primary }]}
        >
          <Ionicons name="add" size={22} color={theme.colors.onPrimary} />
        </Pressable>
      </View>

      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="folder-open-outline" size={40} color={theme.colors.textMuted} />
            <Text
  style={[
    theme.typography.body,
    {
      color: theme.colors.textMuted,
      marginTop: 10,
      textAlign: 'center',
    },
  ]}
>
  No projects yet. Tap{' '}
  <Text
    style={{
      fontSize: 20,
      color: theme.colors.textMuted,
    }}
  >
    +
  </Text>{' '}
  to create one.
</Text>
          </View>
        }
        renderItem={({ item }) => (
          <ProjectCard
            project={item}
            taskCount={tasksForProject(item.id).length}
            onPress={() => router.push(`/project/${item.id}`)}
            onEdit={() => openEdit(item)}
            onDelete={() => handleDelete(item)}
          />
        )}
      />

      <AppModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <ProjectForm
          initialValues={editingProject ?? { color: nextProjectColor(projects) }}
          onSubmit={handleSubmit}
          onCancel={() => setModalVisible(false)}
          submitLabel={editingProject ? 'Save Changes' : 'Create Project'}
        />
      </AppModal>
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
    paddingBottom: 16,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContent: { paddingHorizontal: 20, paddingBottom: 40 },
  empty: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
});
