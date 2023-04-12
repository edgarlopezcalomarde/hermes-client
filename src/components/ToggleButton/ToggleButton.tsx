import React, { useContext } from 'react';
import './toggleButton.css';
import ThemeContext from '../../contexts/ThemeContext';

function ToggleButton() {
  const { isDarkMode, setDarkMode } = useContext(ThemeContext);

  const handleClick = (e: any) => {
    //  e.preventDefault(); //Aqui se actualiza no se por que
    //No ponerle a la label el onclick porque  falla el contextp por el event que actualiza el componente y lo renderiza de nuevo
    setDarkMode(!isDarkMode);
  };

  return (
    <label className="switch">
      <input type="checkbox" />
      <span className="slider" onClick={handleClick}></span>
    </label>
  );
}

export default ToggleButton;
