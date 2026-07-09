import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { buildTheme, AppTheme } from '@/theme';
import { ThemeMode } from '@/types';
import { storage } from '@/services/storage';

interface ThemeContextValue {
  theme: AppTheme;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemScheme = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>('system');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await storage.getThemeMode();
      if (saved) setModeState(saved);
      setLoaded(true);
    })();
  }, []);

  const setMode = (next: ThemeMode) => {
    setModeState(next);
    storage.saveThemeMode(next);
  };

  const resolvedScheme = mode === 'system' ? (systemScheme ?? 'light') : mode;
  const theme = useMemo(() => buildTheme(resolvedScheme === 'dark' ? 'dark' : 'light'), [resolvedScheme]);

  if (!loaded) return null;

  return (
    <ThemeContext.Provider value={{ theme, mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useAppTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useAppTheme must be used within ThemeProvider');
  return ctx;
};
