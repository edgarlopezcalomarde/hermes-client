import React, {  ReactNode, useState } from 'react';
import ThemeContext from './ThemeContext';

interface ContextProps {
  children: ReactNode
}

const DarkModeProvider = ({children}:ContextProps) => {

  const darkModeOn  = localStorage.getItem('darkModeOn') === 'true';

  const [isDarkMode, setIsDarkMode] = useState(darkModeOn);

  const setDarkMode = (value: boolean) => {
    localStorage.setItem('darkModeOn', value.toString());
    setIsDarkMode(value);

    document.documentElement.setAttribute('color-scheme', 'light');
  };


  return (
    <ThemeContext.Provider value={{isDarkMode, setDarkMode}}>
      {
        children
      }
    </ThemeContext.Provider>
  );
  
};

export default DarkModeProvider;