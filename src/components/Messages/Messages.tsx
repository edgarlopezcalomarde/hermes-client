import React, { useEffect, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';

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

function Messages({ currentUser, reciver }: ICMessages) {
  const [allMessages, { data, error, loading }] = useLazyQuery<IAllMessages>(
    ALL_MESSAGE_BETWEN_USERS,
  );

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    allMessages({
      variables: { userId1: currentUser.id, userId2: reciver.id },
    });

    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [allMessages, currentUser.id, data, reciver]);

  if (loading) return <div>loading......</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <div
      className="flex flex-col h-full overflow-x-auto mb-4"
      ref={containerRef}
    >
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-12 ">
          {data &&
            data.allMessages.map((message: IMessage) => (
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

export default Messages;
