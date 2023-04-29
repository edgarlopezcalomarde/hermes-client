import React from 'react';
import { useLocation } from 'react-router-dom';
import Messages from '../Messages/Messages';
import SendSection from '../SendSection/SendSection';

import { ConversationHeader } from './ChatStyle';

function Chat() {
  const currentUser = JSON.parse(localStorage.getItem('current-user')!);
  const location = useLocation();

  const reciver = location.state.participants.filter(
    (participant: any) => participant.id !== currentUser.id,
  )[0];

  return (
    <div className="flex flex-col h-full overflow-x-auto mb-4">
      <div className="flex flex-col h-full">
        <ConversationHeader>
          <h6>{reciver.username}</h6>
        </ConversationHeader>

        <Messages />
        <SendSection />
      </div>
    </div>
  );
}

export default Chat;
