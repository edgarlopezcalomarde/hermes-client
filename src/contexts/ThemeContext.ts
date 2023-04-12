import { createContext } from 'react';

interface ThemeContext {
    isDarkMode:boolean, 
    setIsDarkMode: (value:boolean)=>void
}

const ThemeContext = createContext<ThemeContext>({
    isDarkMode: true,
    setIsDarkMode: () =>{return;}
});

export default ThemeContext;
