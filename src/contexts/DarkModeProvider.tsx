import React, { ReactNode, useMemo, useState, createContext } from 'react';
import useLocalStorage from 'use-local-storage';

interface ThemeContextType {
  theme: string;
  setTheme: (value: string) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

interface ContextProps {
  children: ReactNode;
}

function DarkModeProvider({ children }: ContextProps) {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [themeDefault] = useLocalStorage(
    'theme',
    defaultDark ? 'dark' : 'light',
  );

  const [theme, setTheme] = useState<string>(themeDefault);
  const themeMemo = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={themeMemo}>{children}</ThemeContext.Provider>
  );
}

export default DarkModeProvider;
