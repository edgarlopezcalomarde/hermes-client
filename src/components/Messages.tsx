import React, { useEffect, useRef } from 'react';
import Message from './Message';

import { useLocation, useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { ALL_MESSAGE_BETWEN_USERS } from '../queries/ALL_MESSAGE_BETWEN_USERS';


const Messages = () => {

  const currentUser = JSON.parse(localStorage.getItem('currentUser')!);

  const location = useLocation();
  const reciver = location.state.participants.filter( (participant: any) => participant.id != currentUser.id)[0];
  const [allMessages, {loading, data, error}] = useLazyQuery(ALL_MESSAGE_BETWEN_USERS);

  // Scrollea al final del div
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    allMessages({variables:{userId1:currentUser.id , userId2:reciver.id}});

    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }

  },[data]);

if(data){
  return (
    <div className='messages' ref={containerRef} >
      {
        data.allMessages.map((message:any) => <Message key={message.id} text={message.text} isSender={message.sender === currentUser.id ? true : false}/>)
      }
    </div>
  );
}else{
  return <div></div>;
}
  
};

export default Messages;