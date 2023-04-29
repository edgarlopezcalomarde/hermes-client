import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Chat from '../../components/Chat/Chat';
import Welcome from '../../components/Welcome/Welcome';

import { RightPanel } from './HomeStyle';
import Status from '../../components/Status/Status';
import CURRENT_USER_LOGGED from '../../graphql/queries/CURRENT_USER_LOGGED';
import FilterableList from '../../components/List/FilteredList';
import FriendItem from '../../components/List/FriendItem';
import FriendRequestItem from '../../components/List/FriendRequestItem';
import ALL_USERS from '../../graphql/queries/ALL_USERS';
import useLocalStorage from '../../utils/useLocalStorage';
import NetworkUserItem from '../../components/List/NetworkUserItem';

function ChatList() {
  const [currentUser] = useLocalStorage('current-user', '');
  const [isChat, setIsChat] = useState(false);

  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);
  const [networkUsers, setNetworkUsers] = useState([]);

  const navigate = useNavigate();
  const currentUserQuery = useQuery(CURRENT_USER_LOGGED);
  const allUsersQuery = useQuery(ALL_USERS);

  const openChat = (chat: any) => {
    setIsChat(true);
    navigate('/chatlist', { state: { ...chat } });
  };

  useEffect(() => {
    if (currentUserQuery.data) {
      setFriends(currentUserQuery.data.getCurrentUser.friends);
      setFriendRequests(currentUserQuery.data.getCurrentUser.friendRequest);
    }
    if (allUsersQuery.data) {
      setNetworkUsers(
        allUsersQuery.data.allUsers.filter(
          (user: any) => user.id !== currentUser.id,
        ),
      );
    }
  }, [currentUserQuery.data, allUsersQuery.data, currentUser.id]);

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col py-8 pl-6 pr-2 w-64  flex-shrink-0">
          <div className="flex flex-row items-center justify-center h-12 w-full">
            <div className="font-bold text-2xl">Hermes</div>
          </div>

          <Status />

          <div className="flex flex-col mt-8">
            <FilterableList
              listTitle="Chats"
              initialList={friends}
              renderItem={(user: any) => (
                <FriendItem user={user} openChat={openChat} />
              )}
            />

            <FilterableList
              listTitle="Friend Requests"
              initialList={friendRequests}
              renderItem={(frReq: any) => (
                <FriendRequestItem friendrequest={frReq} />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            {isChat ? <Chat /> : <Welcome />}
          </div>
        </div>
        {/* 
        <RightPanel>
          <FilterableList
            listTitle="Network Users"
            initialList={networkUsers}
            renderItem={(user: any) => <NetworkUserItem user={user} />}
          />
        </RightPanel> */}
      </div>
    </div>
  );
}

export default ChatList;
