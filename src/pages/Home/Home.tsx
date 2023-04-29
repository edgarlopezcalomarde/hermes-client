import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Chat from '../../components/Chat/Chat';
import Welcome from '../../components/Welcome/Welcome';

import Status from '../../components/Status/Status';
import CURRENT_USER_LOGGED from '../../graphql/queries/CURRENT_USER_LOGGED';
import FilterableList from '../../components/List/FilteredList';
import FriendItem from '../../components/List/FriendItem';
import FriendRequestItem from '../../components/List/FriendRequestItem';
import useLocalStorage from '../../utils/useLocalStorage';

function ChatList() {
  const [currentUser] = useLocalStorage('current-user', '');
  const [isChat, setIsChat] = useState(false);

  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);

  const navigate = useNavigate();
  const currentUserQuery = useQuery(CURRENT_USER_LOGGED);

  const openChat = (chat: any) => {
    setIsChat(true);
    navigate('/chatlist', { state: { ...chat } });
  };

  useEffect(() => {
    if (currentUserQuery.data) {
      setFriends(currentUserQuery.data.getCurrentUser.friends);
      setFriendRequests(currentUserQuery.data.getCurrentUser.friendRequest);
    }
  }, [currentUserQuery.data, currentUser.id]);

  return (
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
            filtermessage="Filter contacts"
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
        <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-slate-800 border border-quaternary h-full p-4">
          {isChat ? <Chat /> : <Welcome />}
        </div>
      </div>
    </div>
  );
}

export default ChatList;
