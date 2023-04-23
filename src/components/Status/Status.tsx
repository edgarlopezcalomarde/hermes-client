import React, { useContext, useEffect, useState } from 'react';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';
import { useApolloClient, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { StatusBox, UserInfo } from './StatusStyles';
import CURRENT_USER_LOGGED from '../../graphql/queries/CURRENT_USER_LOGGED';
import { AvatarImg, UserAvatarImg } from '../../styledComponents/Img';

function Status() {
  const client = useApolloClient();
  const navigate = useNavigate();

  const { setIsAuthenticated } = useContext(AuthContext);
  const { data } = useQuery(CURRENT_USER_LOGGED);

  const [avatarImg, setAvatarImg] = useState('');

  const logout = () => {
    localStorage.clear();
    client.resetStore();
    setIsAuthenticated(false);
    navigate('/');
  };

  useEffect(() => {
    if (data) {
      setAvatarImg(data.getCurrentUser.avatarImg);
    }
  }, [data]);

  return (
    <StatusBox>
      <UserInfo>
        {avatarImg === '' ? (
          <CgProfile onClick={() => navigate('/profile')} />
        ) : (
          <AvatarImg src={avatarImg} alt="avatar" />
        )}

        {data && data.getCurrentUser.username}
      </UserInfo>

      <RiLogoutBoxFill onClick={logout} />
    </StatusBox>
  );
}

export default Status;
