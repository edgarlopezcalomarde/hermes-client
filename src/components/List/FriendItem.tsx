import React from 'react';
import { useLazyQuery } from '@apollo/client';
import { AvatarImg } from '../../styledComponents/Img';

import avatarDefault from '../../assets/profileNotFound.jpg';

import FIND_CHAT_BY_ID from '../../graphql/queries/FIND_CHAT_BY_ID';
import { ListItemBox } from './ListStyles';

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
    <ListItemBox
      onClick={() => handleChat(user)}
      onKeyDown={() => handleChat(user)}
      role="button"
      tabIndex={0}
    >
      <AvatarImg
        src={user.avatarImg ? user.avatarImg : avatarDefault}
        alt="avatar"
      />
      {user.username}
    </ListItemBox>
  );
}

export default FriendItem;
