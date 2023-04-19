import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Home.css';
import Chat from '../../components/chat/Chat';
import Welcome from '../../components/Welcome/Welcome';
import Status from '../../components/Status/Status';
import NetworkUsers from '../../components/NetworkUsers/NetworkUsers';
import FriendRequestList from '../../components/FriendRequestList/FriendRequestList';
import FriendList from '../../components/FriendList/FriendList';

function ChatList() {
  const [isNetwork, setIsNetWork] = useState(true);
  const [isContact, setIsContact] = useState(false);
  const [isFriendRequest, setIsFriendRequest] = useState(false);
  const [isChat, setIsChat] = useState(false);

  const navigate = useNavigate();

  const openChat = (chat: any) => {
    setIsChat(true);
    navigate('/chatlist', { state: { ...chat } });
  };

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
          {isContact && <FriendList openChat={openChat} />}
          {isFriendRequest && <FriendRequestList />}
        </div>

        {isChat ? <Chat /> : <Welcome />}
      </div>
    </div>
  );
}

export default ChatList;
