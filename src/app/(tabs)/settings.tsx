import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { useTheme } from '@/hooks/useTheme';
import { useAppTheme } from '@/context/ThemeContext';
import { useData } from '@/context/DataContext';
import { ThemeMode } from '@/types';

const MODES: { label: string; value: ThemeMode; icon: keyof typeof Ionicons.glyphMap }[] = [
  { label: 'Light', value: 'light', icon: 'sunny-outline' },
  { label: 'Dark', value: 'dark', icon: 'moon-outline' },
  { label: 'System', value: 'system', icon: 'phone-portrait-outline' },
];

export default function SettingsScreen() {
  const { theme } = useTheme();
  const { mode, setMode } = useAppTheme();
  const { clearAllData } = useData();

  const handleClearData = () => {
    Alert.alert('Clear all data?', 'This will remove every task and project. This cannot be undone.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', style: 'destructive', onPress: clearAllData },
    ]);
  };

  return (
    <SafeAreaView style={[styles.flex, { backgroundColor: theme.colors.background }]} edges={['top']}>
      <View style={styles.container}>
        <Text style={[theme.typography.headline, { color: theme.colors.text, marginBottom: 24 }]}>Settings</Text>

        <Text style={[theme.typography.label, { color: theme.colors.textSecondary, marginBottom: 10 }]}>
          Appearance
        </Text>
        <View style={[styles.segmentGroup, { backgroundColor: theme.colors.surfaceElevated, borderRadius: theme.radius.md }]}>
          {MODES.map((m) => {
            const active = mode === m.value;
            return (
              <Pressable
                key={m.value}
                onPress={() => setMode(m.value)}
                style={[
                  styles.segment,
                  { backgroundColor: active ? theme.colors.primary : 'transparent', borderRadius: theme.radius.sm },
                ]}
              >
                <Ionicons name={m.icon} size={16} color={active ? theme.colors.onPrimary : theme.colors.textSecondary} />
                <Text
                  style={[
                    theme.typography.label,
                    { color: active ? theme.colors.onPrimary : theme.colors.textSecondary },
                  ]}
                >
                  {m.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={handleClearData}
          style={[
            styles.dangerRow,
            { backgroundColor: theme.colors.dangerBg, borderRadius: theme.radius.md, marginTop: 32 },
          ]}
        >
          <Ionicons name="trash-outline" size={18} color={theme.colors.danger} />
          <Text style={[theme.typography.titleSm, { color: theme.colors.danger }]}>Clear all data</Text>
        </Pressable>

        <Text style={[theme.typography.label, { color: theme.colors.textSecondary, marginTop: 32, marginBottom: 10 }]}>
          About
        </Text>
        <View style={[styles.infoBox, { backgroundColor: theme.colors.surfaceElevated, borderRadius: theme.radius.md }]}>
          <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary }]}>
            TaskFlow is a simple, offline-first task manager that helps you organize your work into
            projects, track progress, and stay on top of what matters. All your data stays on your device.
          </Text>
        </View>

        <Text style={[theme.typography.label, { color: theme.colors.textSecondary, marginTop: 24, marginBottom: 10 }]}>
          Privacy
        </Text>
        <View style={[styles.infoBox, { backgroundColor: theme.colors.surfaceElevated, borderRadius: theme.radius.md }]}>
          <Text style={[theme.typography.bodySm, { color: theme.colors.textSecondary }]}>
            TaskFlow does not collect, store, or share any personal data. Your tasks and projects are
            saved locally on your device and are never sent to any server.
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={[theme.typography.bodySm, { color: theme.colors.textMuted }]}>
            TaskFlow v{Constants.expoConfig?.version ?? '1.0.0'}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, padding: 20 },
  segmentGroup: { flexDirection: 'row', padding: 4, gap: 4 },
  segment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  dangerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  infoBox: {
    padding: 14,
  },
  footer: { marginTop: 'auto', alignItems: 'center', paddingVertical: 20 },
});