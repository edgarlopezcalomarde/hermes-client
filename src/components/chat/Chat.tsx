import React from 'react';
import { useLocation } from 'react-router-dom';
import Messages from '../Messages/Messages';
import SendSection from '../SendSection/SendSection';

import { ChatBox, ConversationHeader } from './ChatStyle';

function Chat() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  const location = useLocation();

  const reciver = location.state.participants.filter(
    (participant: any) => participant.id !== currentUser.id,
  )[0];

  return (
    <ChatBox>
      <ConversationHeader>
        <h6>{reciver.username}</h6>
      </ConversationHeader>

      <Messages />
      <SendSection />
    </ChatBox>
  );
}

export default Chat;
