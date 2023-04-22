import React, { useContext } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home/Home';
import ToggleButton from './components/ToggleButton/ToggleButton';

import Register from './pages/Register/Register';
import './index.css';
import Login from './pages/Login/Login';

import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import { ThemeContext } from './contexts/DarkModeProvider';
import AuthProvider from './contexts/AuthProvider';

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="App" data-theme={theme}>
      <div className="switchMode">
        <ToggleButton />
      </div>

      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/chatlist"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
