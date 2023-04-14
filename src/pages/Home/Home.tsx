import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import './Home.css';
import Chat from '../../components/chat/Chat';
import Welcome from '../../components/Welcome/Welcome';
import Status from '../../components/Status/Status';
import FIND_CHAT_BY_ID from '../../queries/FIND_CHAT_BY_ID';

function ChatList() {
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
    <div className="chatlistPage">
      <div className="content">
        <div className="chatForm">
          <Status status="online" />

          <div className="contactList">
            <div className="searchContact">
              <input
                type="search"
                name="chatSearch"
                id="chatSearch"
                className="inputSearch"
              />
            </div>

            <div className="list">
              {data &&
                data.findChatsById.map((chat: any) => {
                  const { participants } = chat;
                  const reciver = participants.find(
                    (participant: any) => participant.id !== currentUser.id,
                  );

                  return (
                    <li key={chat.id}>
                      <div
                        onClick={() => handleChat(chat)}
                        onKeyDown={() => handleChat(chat)}
                        role="button"
                        className="contact"
                        tabIndex={0}
                      >
                        {reciver.username}
                      </div>
                    </li>
                  );
                })}
            </div>
          </div>
        </div>

        {isChat ? <Chat /> : <Welcome />}
      </div>
    </div>
  );
}

export default ChatList;
