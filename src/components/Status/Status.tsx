import React, { useContext, useEffect, useState } from 'react';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { IoMdSettings } from 'react-icons/io';
import { useApolloClient, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import CURRENT_USER_LOGGED from '../../graphql/queries/CURRENT_USER_LOGGED';
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
    <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg gap-1">
      <div className="h-20 w-20 rounded-full border overflow-hidden">
        <img
          src={avatarImg || avatarDefault}
          alt="avatar"
          className="h-full w-full"
        />
      </div>

      <div className="text-2xl font-semibold capitalize">
        {data && data.getCurrentUser.username}
      </div>

      <div className="flex flex-row items-center mt-3 gap-4 text-3xl">
        <RiLogoutBoxFill onClick={logout} className="cursor-pointer" />
        <div className="text-2xl cursor-pointer">🔎</div>
        <IoMdSettings
          onClick={() => navigate('/profile')}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Status;
