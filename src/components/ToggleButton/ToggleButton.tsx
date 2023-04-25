import React, { useContext } from 'react';
import './toggleButton.css';
import { ThemeContext } from '../../contexts/DarkModeProvider';

function ToggleButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleClick = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', `"${newTheme}"`);
  };

  return (
    <label className="switch" htmlFor="checkButton">
      <input
        type="checkbox"
        id="checkButton"
        defaultChecked={theme === 'light'}
      />
      <span
        className="slider"
        onClick={handleClick}
        onKeyDown={handleClick}
        tabIndex={0}
        role="button"
        aria-label="checkButton"
      />
    </label>
  );
}

export default ToggleButton;
