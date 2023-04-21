import React, { ReactNode, createContext, useMemo, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  loginAuth: () => void;
  logoutAuth: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  loginAuth: () => {},
  logoutAuth: () => {},
});

interface ContextProps {
  children: ReactNode;
}

function AuthProvider({ children }: ContextProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const loginAuth = () => {
    setIsAuthenticated(true);
  };

  const logoutAuth = () => {
    setIsAuthenticated(false);
  };

  const authValue = useMemo(
    () => ({ isAuthenticated, loginAuth, logoutAuth }),
    [isAuthenticated],
  );

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
