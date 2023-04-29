import React from 'react';
import { dateFormat } from '../../utils/helpers';

interface ICMessage {
  text: string;
  isSender: boolean;
  img: string;
  timestamp: string;
}

function Message({ text, isSender, img, timestamp }: ICMessage) {
  const [, hora, minutos] = dateFormat(timestamp);

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
        <div
          className={
            isSender
              ? 'rounded-br-none relative ml-3 text-base py-2 px-4 shadow rounded-xl bg-accent'
              : 'rounded-tl-none relative ml-3 text-base py-2 px-4 shadow rounded-xl bg-accent-secondary'
          }
        >
          <div className="flex gap-2">
            <div className="break-all">
              {text !== '🖼' ? text : ''}
              {img && <img src={img} alt="" className="h-48" />}
            </div>
            <div
              className={
                isSender
                  ? 'text-left text-xs mt-auto'
                  : 'text-left text-xs mt-auto'
              }
            >
              {hora}:{minutos}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
