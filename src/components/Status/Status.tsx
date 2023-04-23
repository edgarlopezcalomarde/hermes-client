import React, { useContext } from 'react';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import StatusBox from './StatusStyles';

function Status() {
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
    <StatusBox>
      <div>
        <CgProfile onClick={() => navigate('/profile')} />
      </div>

      <RiLogoutBoxFill onClick={logout} />
    </StatusBox>
  );
}

export default Status;
