import React from 'react';
import './Message.css';
import { MessageImg } from '../../styledComponents/Img';

interface IMessage {
  text: string;
  isSender: boolean;
  img: string;
}

function Message({ text, isSender, img }: IMessage) {
  return (
    <div className={isSender ? 'message_right' : 'message_left'}>
      {img && <MessageImg src={img} alt="" />}
      <div className="message__bubble" dir="auto">
        {text}
      </div>
      <div className="message__spacer" />
    </div>
  );
}

export default Message;
