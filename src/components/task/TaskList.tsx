import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { TaskCard } from './TaskCard';
import { Task } from '@/types';
import { useTheme } from '@/hooks/useTheme';

interface TaskListProps {
  tasks: Task[];
  accentColor: string;
  activeProjectId?: string;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  ListHeaderComponent?: React.ReactElement | null;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  accentColor,
  activeProjectId,
  onToggle,
  onEdit,
  onDelete,
  ListHeaderComponent,
}) => {
  const { theme } = useTheme();
  const router = useRouter();

  if (tasks.length === 0) {
    return (
      <View>
        {ListHeaderComponent}

        <View style={styles.empty}>
          <Text
            style={[
              theme.typography.headline,
              {
                color: theme.colors.text,
                marginTop: 20,
              },
            ]}
          >
            No tasks yet
          </Text>

          <Text
            style={[
              theme.typography.body,
              {
                color: theme.colors.textMuted,
                marginTop: 8,
                textAlign: 'center',
                paddingHorizontal: 30,
                lineHeight: 22,
              },
            ]}
          >
            Create your first task to start organizing your work.
          </Text>

         <Pressable
  onPress={() =>
    router.push({
      pathname: '/task/new',
      params: {
        projectId: activeProjectId,
      },
    })
  }
  style={[
    styles.createButton,
    {
      backgroundColor: theme.colors.primary,
    },
  ]}
>
            <Ionicons
              name="add"
              size={20}
              color={theme.colors.onPrimary}
            />

            <Text
              style={[
                theme.typography.titleSm,
                {
                  color: theme.colors.onPrimary,
                },
              ]}
            >
              Create Task
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={{ paddingBottom: 40 }}
      renderItem={({ item, index }) => (
        <TaskCard
          task={item}
          accentColor={accentColor}
          onToggle={() => onToggle(item.id)}
          onEdit={() => onEdit(item)}
          onDelete={() => onDelete(item.id)}
          index={index}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  createButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: 14,
    gap: 8,
    minWidth: 180,
  },
});