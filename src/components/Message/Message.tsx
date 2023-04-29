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
          ? 'col-start-6 col-end-13 p-3 rounded-lg'
          : 'col-start-1 col-end-8 p-3 rounded-lg'
      }
    >
      <div
        className={
          isSender
            ? 'flex items-center justify-start flex-row-reverse'
            : 'flex flex-row items-center'
        }
      >
        <div className="rounded-tl-none relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
          <div className="break-all">
            {text !== '🖼' ? text : ''}
            {img && <MessageImg src={img} alt="" />}
          </div>

          <div
            className={
              isSender
                ? 'absolute text-xs bottom-0 right-1 -mb-5 mr-2 text-gray-500 w-14'
                : 'absolute text-xs bottom-0 left-0 -mb-5 ml-2 text-gray-500 w-32'
            }
          >
            {hora}:{minutos} {type}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
