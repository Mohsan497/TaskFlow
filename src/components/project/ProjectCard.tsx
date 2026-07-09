import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { useTheme } from '@/hooks/useTheme';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  taskCount: number;
  onPress: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, taskCount, onPress, onEdit, onDelete }) => {
  const { theme } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <Card accentColor={project.color} style={{ marginBottom: 12 }}>
        <View style={styles.row}>
          <View style={styles.textCol}>
            <Text style={[theme.typography.title, { color: theme.colors.text }]}>{project.name}</Text>
            {!!project.description && (
              <Text
                style={[theme.typography.bodySm, { color: theme.colors.textSecondary, marginTop: 4 }]}
                numberOfLines={2}
              >
                {project.description}
              </Text>
            )}
            <Text style={[theme.typography.bodySm, { color: theme.colors.textMuted, marginTop: 8 }]}>
              {taskCount} {taskCount === 1 ? 'task' : 'tasks'}
            </Text>
          </View>
          <View style={styles.actions}>
            <Pressable
              hitSlop={8}
              onPress={onEdit}
              style={[styles.iconBtn, { backgroundColor: theme.colors.surfaceElevated }]}
            >
              <Ionicons name="pencil" size={16} color={theme.colors.textSecondary} />
            </Pressable>
            <Pressable
              hitSlop={8}
              onPress={onDelete}
              style={[styles.iconBtn, { backgroundColor: theme.colors.dangerBg }]}
            >
              <Ionicons name="trash" size={16} color={theme.colors.danger} />
            </Pressable>
          </View>
        </View>
      </Card>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  textCol: { flex: 1 },
  actions: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
