import { createContext } from 'react';

interface ThemeContext {
    isDarkMode:boolean, 
    setDarkMode: (value:boolean)=>void
}

const darkModeOn  = localStorage.getItem('darkModeOn') === 'true';

const ThemeContext = createContext<ThemeContext>({
    isDarkMode: darkModeOn  ,
    setDarkMode: () =>{return;}
});

export default ThemeContext;
