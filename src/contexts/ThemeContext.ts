import { createContext } from 'react';

interface IThemeContext {
  isDarkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

const darkModeOn = localStorage.getItem('darkModeOn') === 'true';

const ThemeContext = createContext<IThemeContext>({
  isDarkMode: darkModeOn,
  setDarkMode: () => {},
});

export default ThemeContext;
