import React, { useContext } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ToggleButton from './components/ToggleButton/ToggleButton';
import ThemeContext from './contexts/ThemeContext';
import Register from './pages/Register/Register';
import './index.css';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="App" data-theme={theme}>
      <div className="switchMode">
        <ToggleButton />
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/chatlist" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
