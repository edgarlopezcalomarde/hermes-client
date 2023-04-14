import React, { useContext } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/login/Login';
import ToggleButton from './components/ToggleButton/ToggleButton';
import ThemeContext from './contexts/ThemeContext';

import './index.css';

function App() {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className="App">
      <div className="switchMode">
        <ToggleButton />
        <div style={{ color: 'black' }}>{isDarkMode ? 'dark' : 'light'}</div>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/chatlist" element={<Home />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
