import { createContext } from 'react';

interface ThemeContextType {
  theme: string;
  setTheme: (value: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
});

export default ThemeContext;
