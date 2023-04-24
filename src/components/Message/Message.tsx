import React from 'react';
import './Message.css';
import { MessageImg } from '../../styledComponents/Img';
import { dateFormat } from '../../utils/helpers';

interface IMessage {
  text: string;
  isSender: boolean;
  img: string;
  timestamp: string;
}

function Message({ text, isSender, img, timestamp }: IMessage) {
  const [, hora, minutos, type] = dateFormat(timestamp);

  return (
    <div className={isSender ? 'message_right' : 'message_left'}>
      <div className="message__bubble" dir="auto">
        <div>
          {text !== '🖼' ? text : ''}
          {img && <MessageImg src={img} alt="" />}
        </div>

        <div className="message_time">
          {hora}:{minutos} {type}
        </div>
      </div>
      <div className="message__spacer" />
    </div>
  );
}

export default Message;
