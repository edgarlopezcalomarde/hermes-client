import React, { useContext, useEffect, useState } from 'react';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { IoMdSettings } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { useApolloClient, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { StatusBox, UserInfo } from './StatusStyles';
import CURRENT_USER_LOGGED from '../../graphql/queries/CURRENT_USER_LOGGED';
import { AvatarImg } from '../../styledComponents/Img';
import avatarDefault from '../../assets/profileNotFound.jpg';

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
        <AvatarImg
          onClick={() => navigate('/profile')}
          src={avatarImg || avatarDefault}
          alt="avatar"
        />
        {data && data.getCurrentUser.username}
      </UserInfo>

      <div>
        <IoMdSettings onClick={() => navigate('/profile')} />
        <RiLogoutBoxFill onClick={logout} />
      </div>
    </StatusBox>
  );
}

export default Status;
