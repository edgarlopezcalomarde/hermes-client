import React, { useEffect, useRef } from 'react';
import { useLazyQuery, useSubscription } from '@apollo/client';

import ALL_MESSAGE_BETWEN_USERS, {
  IAllMessages,
} from '../../graphql/queries/ALL_MESSAGE_BETWEN_USERS';
import Message from '../Message/Message';
import { IMessage } from '../../models/message';
import { IUser } from '../../models/user';
import NEW_CHAT_MESSAGE_SUBSCRIPTION from '../../graphql/subscriptions/NEW_MESSAGE';

interface ICMessages {
  currentUser: IUser;
  reciver: IUser;
}

function MessagesDoS({ currentUser, reciver }: ICMessages) {
  const [allMessages, { data, error, loading, subscribeToMore }] = useLazyQuery(
    ALL_MESSAGE_BETWEN_USERS,
    {
      variables: { userId1: currentUser.id, userId2: reciver.id },
    },
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

  useSubscription(NEW_CHAT_MESSAGE_SUBSCRIPTION, {
    variables: { sender: reciver.id, reciver: currentUser.id },
    onSubscriptionData: ({ client, subscriptionData }) => {
      const { newMessage } = subscriptionData.data;
      client.writeQuery({
        query: ALL_MESSAGE_BETWEN_USERS,
        variables: { userId1: currentUser.id, userId2: reciver.id },
        data: { allMessages: [newMessage, ...data.allMessages] },
      });
    },
  });

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

export default MessagesDoS;
