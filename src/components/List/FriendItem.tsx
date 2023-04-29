import React from 'react';
import { useLazyQuery } from '@apollo/client';

import avatarDefault from '../../assets/profileNotFound.jpg';

import FIND_CHAT_BY_ID from '../../graphql/queries/FIND_CHAT_BY_ID';

function FriendItem({ user, openChat }: any) {
  const [findChatsById] = useLazyQuery(FIND_CHAT_BY_ID);

  const handleChat = async (friend: any) => {
    const { data } = await findChatsById({
      variables: { findChatsByIdId: friend.id },
    });

    if (data) {
      openChat(data.findChatsById[0]);
    }
  };

  return (
    <button
      type="submit"
      className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 w-full"
      onClick={() => handleChat(user)}
      onKeyDown={() => handleChat(user)}
    >
      <div className="relative h-12 w-12 ">
        <img
          className="rounded-full h-12 w-12"
          src={user.avatarImg ? user.avatarImg : avatarDefault}
          alt="avatar"
        />
      </div>
      <div className="ml-2 text-base font-semibold">{user.username}</div>
    </button>
  );
}

export default FriendItem;
