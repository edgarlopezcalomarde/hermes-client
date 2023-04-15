import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import './Home.css';
import Chat from '../../components/chat/Chat';
import Welcome from '../../components/Welcome/Welcome';
import Status from '../../components/Status/Status';
import FIND_CHAT_BY_ID from '../../queries/FIND_CHAT_BY_ID';
import ContactList from '../../components/ContactList/ContactList';
import NetworkUsers from '../../components/NetworkUsers/NetworkUsers';
import FriendRequestList from '../../components/FriendRequestList/FriendRequestList';

function ChatList() {
  const [isNetwork, setIsNetWork] = useState(true);
  const [isContact, setIsContact] = useState(false);
  const [isFriendRequest, setIsFriendRequest] = useState(false);

  const [findChatsById, { data, error, loading }] =
    useLazyQuery(FIND_CHAT_BY_ID);

  const currentUser = JSON.parse(localStorage.getItem('currentUser')!);

  const navigate = useNavigate();

  const [isChat, setIsChat] = useState(false);

  useEffect(() => {
    findChatsById({ variables: { findChatsByIdId: currentUser.id } });
  }, []);

  const handleChat = (chat: any) => {
    setIsChat(true);
    navigate('/chatlist', { state: { ...chat } });
  };

  if (loading) return <div>loading......</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <div className="homePage">
      <div className="chatLayout">
        <div className="leftPanel">
          <Status status="online" />

          <div className="leftPanelButtonsBox">
            <button
              type="submit"
              onClick={() => {
                setIsNetWork(true);
                setIsContact(false);
                setIsFriendRequest(false);
              }}
            >
              Network Users
            </button>

            <button
              type="submit"
              onClick={() => {
                setIsNetWork(false);
                setIsContact(true);
                setIsFriendRequest(false);
              }}
            >
              Contact List
            </button>

            <button
              type="submit"
              onClick={() => {
                setIsNetWork(false);
                setIsContact(false);
                setIsFriendRequest(true);
              }}
            >
              Friend Requests
            </button>
          </div>

          {isNetwork && <NetworkUsers />}
          {isContact && (
            <ContactList
              data={data}
              handleChat={handleChat}
              currentUser={currentUser}
            />
          )}
          {isFriendRequest && <FriendRequestList />}
        </div>

        {isChat ? <Chat /> : <Welcome />}
      </div>
    </div>
  );
}

export default ChatList;
