import React, {  ReactNode, useState } from 'react';
import ThemeContext from './ThemeContext';

interface ContextProps {
  children: ReactNode
}

const DarkModeProvider = ({children}:ContextProps) => {

  const [isDarkMode, setIsDarkMode] = useState(true);


  return (
    <ThemeContext.Provider value={{isDarkMode, setIsDarkMode}}>
      {
        children
      }
    </ThemeContext.Provider>
  );
  

  // return (
  //   <ThemeContext.Provider value={{isDarkMode, setIsDarkMode}}>
  //     {
  //       children
  //     }
  //   </ThemeContext.Provider>
  // );
  
};

export default DarkModeProvider;