import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaLocationArrow } from 'react-icons/fa';
import './SendSection.css';
import ALL_MESSAGE_BETWEN_USERS from '../../queries/ALL_MESSAGE_BETWEN_USERS';
import CREATE_MESSAGE from '../../mutations/CREATE_MESSAGE';

function SendSection() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  const location = useLocation();
  const reciver = location.state.participants.filter(
    (participant: any) => participant.id !== currentUser.id,
  )[0];

  const [message, setMessage] = useState('');
  const [createMessage] = useMutation(CREATE_MESSAGE, {
    refetchQueries: [
      {
        query: ALL_MESSAGE_BETWEN_USERS,
        variables: { userId1: currentUser.id, userId2: reciver.id },
      },
    ],
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSend = () => {
    createMessage({
      variables: {
        text: message,
        receiver: reciver.id,
        sender: currentUser.id,
      },
    });
    setMessage('');
  };

  return (
    <div className="sendSection">
      <input
        type="text"
        placeholder="Escribe un mensaje......"
        className="inputMessage"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="btnSend" onClick={handleSend} type="submit">
        <FaLocationArrow />
      </button>
    </div>
  );
}

export default SendSection;
