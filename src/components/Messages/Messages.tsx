import React, { useEffect, useRef } from 'react';

import { useLocation } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import Message from '../Message/Message';

import './Messages.css';
import ALL_MESSAGE_BETWEN_USERS from '../../queries/ALL_MESSAGE_BETWEN_USERS';

function Messages() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')!);

  const location = useLocation();
  const reciver = location.state.participants.filter(
    (participant: any) => participant.id !== currentUser.id,
  )[0];
  const [allMessages, { data }] = useLazyQuery(ALL_MESSAGE_BETWEN_USERS);

  // Scrollea al final del div
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    allMessages({
      variables: { userId1: currentUser.id, userId2: reciver.id },
    });

    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [data]);

  if (data) {
    return (
      <div className="messages" ref={containerRef}>
        {data.allMessages.map((message: any) => (
          <Message
            key={message.id}
            text={message.text}
            isSender={message.sender === currentUser.id}
          />
        ))}
      </div>
    );
  }
  return <div />;
}

export default Messages;
