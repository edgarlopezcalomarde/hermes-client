/* eslint-disable react/jsx-no-constructed-context-values */
import React, { ReactNode, useMemo, useState } from 'react';
import useLocalStorage from 'use-local-storage';
import ThemeContext from './ThemeContext';

interface ContextProps {
  children: ReactNode;
}

function DarkModeProvider({ children }: ContextProps) {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [themeDefault] = useLocalStorage(
    'theme',
    defaultDark ? 'dark' : 'light',
  );

  // console.log(defaultDark);

  const [theme, setTheme] = useState<string>(themeDefault);
  const themeMemo = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={themeMemo}>{children}</ThemeContext.Provider>
  );
}

export default DarkModeProvider;
