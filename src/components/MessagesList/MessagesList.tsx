import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';

import ALL_MESSAGE_BETWEN_USERS, {
  IAllMessages,
} from '../../graphql/queries/ALL_MESSAGE_BETWEN_USERS';
import MessageItem from '../MessageItem/MessageItem';
import { IMessage } from '../../models/message';
import { IUser } from '../../models/user';
import NEW_MESSAGE from '../../graphql/subscriptions/NEW_MESSAGE';

interface ICMessages {
  currentUser: IUser;
  reciver: IUser;
}

function MessagesList({ currentUser, reciver }: ICMessages) {
  const { data, error, loading } = useQuery<IAllMessages>(
    ALL_MESSAGE_BETWEN_USERS,
    {
      variables: { userId1: currentUser.id, userId2: reciver.id },
    },
  );

  const [messages, setMessages] = useState<IMessage[]>([]);

  const { data: subscriptionData } = useSubscription(NEW_MESSAGE);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages(data?.allMessages || []);
  }, [data?.allMessages]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (subscriptionData && subscriptionData.newChatMessage) {
      setMessages((prevMessages: any) => [
        ...prevMessages,
        subscriptionData.newChatMessage,
      ]);
    }
  }, [subscriptionData]);

  if (loading) return <div>loading......</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <div
      className="flex flex-col h-full overflow-x-auto mb-4"
      ref={containerRef}
    >
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-12 ">
          {messages.map((message: IMessage) => (
            <MessageItem
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

export default MessagesList;
