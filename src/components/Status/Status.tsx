import React from 'react';
import { RiLogoutBoxFill } from 'react-icons/ri';
import './Status.css';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

interface IStatus {
  status: string;
}

function Status({ status }: IStatus) {
  const client = useApolloClient();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    client.resetStore();
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
