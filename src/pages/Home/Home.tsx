import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

import Chat from '../../components/chat/Chat';
import Welcome from '../../components/Welcome/Welcome';
import NetworkUsers from '../../components/NetworkUsers/NetworkUsers';
import FriendRequestList from '../../components/FriendRequestList/FriendRequestList';
import FriendList from '../../components/FriendList/FriendList';

import { ChatPanel, HomePageLayout, LeftPanel, RightPanel } from './HomeStyle';

function ChatList() {
  const [isChat, setIsChat] = useState(false);

  const navigate = useNavigate();
  const client = useApolloClient();

  const openChat = (chat: any) => {
    setIsChat(true);
    navigate('/chatlist', { state: { ...chat } });
  };

  const logout = () => {
    localStorage.clear();
    client.resetStore();
    navigate('/');
  };

  return (
    <HomePageLayout>
      <LeftPanel>
        <h2>Chats</h2>

        <FriendList openChat={openChat} />
      </LeftPanel>

      <ChatPanel>{isChat ? <Chat /> : <Welcome />}</ChatPanel>

      <RightPanel>
        <div>
          <h2>Network Users</h2>
          <NetworkUsers />
        </div>

        <div>
          <h2>Friend Requests</h2>
          <FriendRequestList />
        </div>
      </RightPanel>
    </HomePageLayout>
  );
}

export default ChatList;
