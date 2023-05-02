import React, { useRef } from 'react';
import { useQuery } from '@apollo/client';

import ALL_MESSAGE_BETWEN_USERS, {
  IAllMessages,
} from '../../graphql/queries/ALL_MESSAGE_BETWEN_USERS';
import Message from '../Message/Message';
import { IMessage } from '../../models/message';
import { IUser } from '../../models/user';

interface ICMessages {
  currentUser: IUser;
  reciver: IUser;
}

function MessagesTres({ currentUser, reciver }: ICMessages) {
  const { data, error, loading } = useQuery<IAllMessages>(
    ALL_MESSAGE_BETWEN_USERS,
    {
      variables: { userId1: currentUser.id, userId2: reciver.id },
      pollInterval: 1000,
    },
  );

  const containerRef = useRef<HTMLDivElement>(null);

  if (loading) return <div>loading......</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <div
      className="flex flex-col h-full overflow-x-auto mb-4"
      ref={containerRef}
    >
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-12 ">
          {data?.allMessages.map((message: IMessage) => (
            <Message
              key={message.id}
              text={message.text}
              isSender={message.sender === currentUser.id}
              img={message.image}
              timestamp={message.createdAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MessagesTres;
