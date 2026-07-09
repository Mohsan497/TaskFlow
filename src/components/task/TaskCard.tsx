import React, { useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useTheme } from '@/hooks/useTheme';
import { Task } from '@/types';
import { formatDate } from '@/utils/dateHelpers';

interface TaskCardProps {
  task: Task;
  accentColor: string;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  index?: number;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, accentColor, onToggle, onEdit, onDelete, index = 0 }) => {
  const { theme } = useTheme();
  const isDone = task.status === 'done';

  const opacity = useSharedValue(0);
  const translateY = useSharedValue(16);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 350 });
    translateY.value = withTiming(0, { duration: 350 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Card accentColor={isDone ? theme.colors.success : accentColor} style={{ marginBottom: 14 }}>
        <View style={styles.headerRow}>
          <Badge label={isDone ? 'Done' : 'Pending'} tone={isDone ? 'success' : 'warning'} />
          <View style={styles.actions}>
            <Pressable
              hitSlop={8}
              onPress={onEdit}
              style={[styles.iconBtn, { backgroundColor: theme.colors.surfaceElevated }]}
            >
              <Ionicons name="pencil" size={15} color={theme.colors.textSecondary} />
            </Pressable>
            <Pressable
              hitSlop={8}
              onPress={onDelete}
              style={[styles.iconBtn, { backgroundColor: theme.colors.dangerBg }]}
            >
              <Ionicons name="trash" size={15} color={theme.colors.danger} />
            </Pressable>
            <Pressable
              hitSlop={8}
              onPress={onToggle}
              style={[
                styles.iconBtn,
                { backgroundColor: isDone ? theme.colors.success : theme.colors.surfaceElevated },
              ]}
            >
              <Ionicons name="checkmark" size={16} color={isDone ? theme.colors.onPrimary : theme.colors.textSecondary} />
            </Pressable>
          </View>
        </View>

        <Text
          style={[
            theme.typography.title,
            {
              color: theme.colors.text,
              marginTop: 12,
              textDecorationLine: isDone ? 'line-through' : 'none',
              opacity: isDone ? 0.6 : 1,
            },
          ]}
        >
          {task.title}
        </Text>

        <Text style={[theme.typography.bodySm, { color: theme.colors.textMuted, marginTop: 4 }]}>
          {task.description?.trim() ? task.description : 'No description yet'}
        </Text>

        <View style={styles.footerRow}>
          <View style={styles.dateRow}>
            <Ionicons name="calendar-outline" size={14} color={theme.colors.textMuted} />
            <Text style={[theme.typography.bodySm, { color: theme.colors.textMuted }]}>
              {formatDate(task.dueDate)}
            </Text>
          </View>
          {!!task.dueTime && (
            <Text style={[theme.typography.bodySm, { color: theme.colors.textMuted }]}>{task.dueTime}</Text>
          )}
        </View>
      </Card>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  actions: { flexDirection: 'row', gap: 8 },
  iconBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  dateRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
});
