import React from 'react';
import './Message.css';

interface IMessage {
  text: string;
  isSender: boolean;
}

function Message({ text, isSender }: IMessage) {
  return (
    <div className={isSender ? 'message_right' : 'message_left'}>
      <div className="message__bubble" dir="auto">
        {text}
      </div>
      <div className="message__spacer" />
    </div>
  );
}

export default Message;
