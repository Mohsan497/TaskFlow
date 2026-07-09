import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SummaryCard } from './SummaryCard';
import { SummaryStats } from '@/types';
import { useTheme } from '@/hooks/useTheme';

interface SummaryGridProps {
  stats: SummaryStats;
}

export const SummaryGrid: React.FC<SummaryGridProps> = ({ stats }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.grid, { gap: theme.spacing.md }]}>
      <SummaryCard value={stats.totalTasks} label="Tasks" delay={0} />
      <SummaryCard value={stats.totalProjects} label="Projects" accentColor={theme.colors.primary} delay={50} />
      <SummaryCard value={stats.pending} label="Pending" accentColor={theme.colors.warning} delay={100} />
      <SummaryCard value={stats.done} label="Success" accentColor={theme.colors.success} delay={150} />
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
