import React from 'react';
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
    <div
      className={
        isSender
          ? 'col-start-1 col-end-8 p-3 rounded-lg'
          : 'col-start-6 col-end-13 p-3 rounded-lg'
      }
    >
      <div
        className={
          isSender
            ? 'flex flex-row items-center'
            : 'flex items-center justify-start flex-row-reverse'
        }
      >
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
          IMAGEN
        </div>
        <div className="rounded-tl-none relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
          <div>
            {text !== '🖼' ? text : ''}
            {img && <MessageImg src={img} alt="" />}
          </div>

          <div className="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">
            {hora}:{minutos} {type}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
