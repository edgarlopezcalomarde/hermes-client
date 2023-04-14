import React, { ReactNode, useMemo, useState } from 'react';
import ThemeContext from './ThemeContext';

interface ContextProps {
  children: ReactNode;
}

function DarkModeProvider({ children }: ContextProps) {
  const darkModeOn = localStorage.getItem('darkModeOn') === 'true';

  const [isDarkMode, setIsDarkMode] = useState(darkModeOn);

  const setDarkMode = (value: boolean) => {
    localStorage.setItem('darkModeOn', value.toString());
    setIsDarkMode(value);

    console.log(value);

    document.documentElement.setAttribute('color-scheme', 'light');
  };

  const darkModeMemo = useMemo(
    () => ({ isDarkMode, setDarkMode }),
    [isDarkMode],
  );

  return (
    <ThemeContext.Provider value={darkModeMemo}>
      {children}
    </ThemeContext.Provider>
  );
}

export default DarkModeProvider;
