import React, { useContext } from 'react';
import './toggleButton.css';
import ThemeContext from '../../contexts/ThemeContext';

function ToggleButton() {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleClick = () => {
    //  e.preventDefault(); //Aqui se actualiza no se por que
    // No ponerle a la label el onclick porque  falla el contextp por el event que actualiza el componente y lo renderiza de nuevo
    // setDarkMode(!isDarkMode);
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
