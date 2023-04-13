import React, { FC } from 'react';
import './Message.css';

interface Message {
  text:string
  isSender:boolean
}

const Message:FC<Message>  = ({text, isSender}) => {
  return (
    <div className={isSender ?  'message_right' : 'message_left' }>
      <div className="message__bubble" dir="auto">{text}</div>
      <div className="message__spacer"></div>
    </div>
  );
};

export default Message;
