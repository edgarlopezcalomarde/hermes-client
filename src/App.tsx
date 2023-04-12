import React, { useContext, useEffect } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat';
import ChatList from './pages/ChatList';
import Login from './pages/login/Login';
import './index.css';
import ToggleButton from './components/ToggleButton/ToggleButton';
import ThemeContext from './contexts/ThemeContext';

function App() {

  const {isDarkMode} = useContext(ThemeContext);
  
  console.log(isDarkMode);
  return (
    <div className="App">

      <div className="switchMode">
        <ToggleButton />
        <div style={{color:'black'}}>{isDarkMode?'dark': 'light'}</div>
      </div>
      
      <BrowserRouter>
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/chatlist" element={<ChatList />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
