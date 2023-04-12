import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { CREATE_MESSAGE } from '../mutations/CREATE_MESSAGE';
import { ALL_MESSAGE_BETWEN_USERS } from '../queries/ALL_MESSAGE_BETWEN_USERS';


function SendSection() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  const location = useLocation();
  const reciver = location.state.participants.filter( (participant:any) => participant.id != currentUser.id)[0];

  const [message, setMessage] = useState('');
  const [createMessage, result]= useMutation(CREATE_MESSAGE, {
    refetchQueries:[{query: ALL_MESSAGE_BETWEN_USERS, variables:{userId1:currentUser.id , userId2:reciver.id}}],
    onError: (error) => {
      console.log(error);
    }
  });

  const handleSend = () =>{
    createMessage({variables:{text:message, receiver:reciver.id, sender: currentUser.id}});
  };

  return (
    <div className='sendSection'>
        <input type="text" placeholder="Escribe un mensaje......" className='inputMessage' value={message} onChange={(e)=> setMessage(e.target.value)}/> 
        <button className='btnSend' onClick={handleSend}>
            ✈
        </button>
    </div> 
  );
}

export default SendSection;