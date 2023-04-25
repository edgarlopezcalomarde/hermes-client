import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Chat from '../../components/chat/Chat';
import Welcome from '../../components/Welcome/Welcome';
import NetworkUsers from '../../components/NetworkUsers/NetworkUsers';
import FriendRequestList from '../../components/FriendRequestList/FriendRequestList';
import FriendList from '../../components/FriendList/FriendList';

import { ChatPanel, HomePageLayout, LeftPanel, RightPanel } from './HomeStyle';
import Status from '../../components/Status/Status';
import CURRENT_USER_LOGGED from '../../graphql/queries/CURRENT_USER_LOGGED';
import FilterableList from '../../components/List/FilteredList';
import FriendItem from '../../components/List/FriendItem';

function ChatList() {
  const [isChat, setIsChat] = useState(false);

  const [friends, setFriends] = useState([]);

  const navigate = useNavigate();
  const { data, loading, error } = useQuery(CURRENT_USER_LOGGED);

  const openChat = (chat: any) => {
    setIsChat(true);
    navigate('/chatlist', { state: { ...chat } });
  };

  useEffect(() => {
    if (data) {
      setFriends(data.getCurrentUser.friends);
    }
  }, [data]);

  return (
    <HomePageLayout>
      <LeftPanel>
        <Status />
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

          <FilterableList
            listTitle="Friends"
            initialList={friends}
            renderItem={(user: any) => (
              <FriendItem user={user} openChat={openChat} />
            )}
          />
        </div>
      </RightPanel>
    </HomePageLayout>
  );
}

export default ChatList;
