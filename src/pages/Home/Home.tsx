import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Chat from '../../components/Chat/Chat';
import Welcome from '../../components/Welcome/Welcome';

import { ChatPanel, HomePageLayout, LeftPanel, RightPanel } from './HomeStyle';
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
    <HomePageLayout>
      <LeftPanel>
        <Status />
        <FilterableList
          listTitle="Chats"
          initialList={friends}
          renderItem={(user: any) => (
            <FriendItem user={user} openChat={openChat} />
          )}
        />
      </LeftPanel>

      <ChatPanel>{isChat ? <Chat /> : <Welcome />}</ChatPanel>

      <RightPanel>
        <FilterableList
          listTitle="Network Users"
          initialList={networkUsers}
          renderItem={(user: any) => <NetworkUserItem user={user} />}
        />

        <FilterableList
          listTitle="Friend Requests"
          initialList={friendRequests}
          renderItem={(frReq: any) => (
            <FriendRequestItem friendrequest={frReq} />
          )}
        />
      </RightPanel>
    </HomePageLayout>
  );
}

export default ChatList;
