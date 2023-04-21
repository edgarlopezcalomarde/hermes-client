import React, { useContext } from 'react';
import { RiLogoutBoxFill } from 'react-icons/ri';
import './Status.css';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

interface IStatus {
  status: string;
}

function Status({ status }: IStatus) {
  const client = useApolloClient();
  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);

  const logout = () => {
    localStorage.clear();
    client.resetStore();
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div className="status">
      <h3>{status}</h3>
      <RiLogoutBoxFill className="btnLogout" onClick={logout} />
    </div>
  );
}

export default Status;
