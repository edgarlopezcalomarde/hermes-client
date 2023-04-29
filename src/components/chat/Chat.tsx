import React from 'react';
import { useLocation } from 'react-router-dom';
import Messages from '../Messages/Messages';
import SendSection from '../SendSection/SendSection';
import useLocalStorage from '../../utils/useLocalStorage';

function Chat() {
  const [currentUser] = useLocalStorage('current-user', '');

  const location = useLocation();

  const reciver = location.state.participants.filter(
    (participant: any) => participant.id !== currentUser.id,
  )[0];

  return (
    <>
      <div className="w-full  p-4 border-b-2">
        <h6 className="text-3xl font-semibold capitalize">
          {reciver.username}
        </h6>
      </div>
      <Messages currentUser={currentUser} reciver={reciver} />
      <SendSection />
    </>
  );
}

export default Chat;
