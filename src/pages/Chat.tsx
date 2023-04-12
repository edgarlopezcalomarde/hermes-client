import React from 'react';
import Messages from '../components/Messages';
import SendSection from '../components/SendSection';
import { FaArrowLeft } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

function Chat() {

  const navigation = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  const location = useLocation();
  const reciver = location.state.participants.filter( (participant:any) => participant.id != currentUser.id)[0];

  return (
    <div className="chat">

      <div style={{ color:'black', fontSize:'30px', display:'flex', justifyContent:'space-between', padding:'20px 20px', borderBottom:'1px solid rgb(30, 30, 30)'}}>
        <FaArrowLeft onClick={ ()=> navigation('/chatlist')}/>

        <div style={{display:'flex', justifyContent:'center', alignItems:'center', gap:'10px'}}>
          <h6 style={{ fontSize:'20px' }}>{reciver.username}</h6>
        </div>

      </div>
      <Messages />
      <SendSection  />
    </div>
  );
}

export default Chat;