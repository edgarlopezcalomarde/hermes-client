import React, { useEffect, useRef } from 'react';

import { useLocation } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import Message from '../Message/Message';

import './Messages.css';
import ALL_MESSAGE_BETWEN_USERS from '../../graphql/queries/ALL_MESSAGE_BETWEN_USERS';

function Messages() {
  const currentUser = JSON.parse(localStorage.getItem('current-user')!);
  const location = useLocation();
  const reciver = location.state.participants.filter(
    (participant: any) => participant.id !== currentUser.id,
  )[0];
  const [allMessages, { data, error, loading }] = useLazyQuery(
    ALL_MESSAGE_BETWEN_USERS,
  );

  // Scrollea al final del div
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    allMessages({
      variables: { userId1: currentUser.id, userId2: reciver.id },
    });

    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [data, reciver]);

  if (loading) return <div>loading......</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <div className="messages" ref={containerRef}>
      {data &&
        data.allMessages.map((message: any) => (
          <Message
            key={message.id}
            text={message.text}
            isSender={message.sender === currentUser.id}
            img={message.image}
          />
        ))}
    </div>
  );
}

export default Messages;
