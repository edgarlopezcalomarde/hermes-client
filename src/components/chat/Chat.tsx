import React from 'react';
import { useLocation } from 'react-router-dom';
import Messages from '../Messages/Messages';
import SendSection from '../SendSection/SendSection';

import './chat.css';

function Chat() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  const location = useLocation();
  const reciver = location.state.participants.filter(
    (participant: any) => participant.id !== currentUser.id,
  )[0];

  return (
    <div className="chat">
      <div
        style={{
          color: 'black',
          fontSize: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px 20px',
          borderBottom: '1px solid rgb(30, 30, 30)',
        }}
      >
        <div style={{ display: 'flex' }}>
          <h6 style={{ fontSize: '20px', marginRight: 'auto' }}>
            {reciver.username}
          </h6>
        </div>
      </div>

      <Messages />
      <SendSection />
    </div>
  );
}

export default Chat;
