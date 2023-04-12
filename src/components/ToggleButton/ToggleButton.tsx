import React, { useContext } from 'react';
import './toggleButton.css';
import ThemeContext from '../../contexts/ThemeContext';

function ToggleButton() {
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);

  const handleClick = (e: any) => {
    e.preventDefault(); //Aqui se actualiza no se por que
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div onClick={handleClick}>
      <label className="switch">
        <input type="checkbox"/>
        <span className="slider"></span>
      </label>
    </div>
  );
}

export default ToggleButton;
