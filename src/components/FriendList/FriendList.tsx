import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import CURRENT_USER_LOGGED from '../../graphql/queries/CURRENT_USER_LOGGED';
import FIND_CHAT_BY_ID from '../../graphql/queries/FIND_CHAT_BY_ID';
import { Input } from '../../styledComponents/Input';
import { AvatarImg } from '../../styledComponents/Img';

import avatarDefault from '../../assets/profileNotFound.jpg';
import { List, ListItem, ListItemBox } from './FriendListStyle';

function FriendList({ openChat }: any) {
  const { data, loading, error } = useQuery(CURRENT_USER_LOGGED);

  const [friends, setFriends] = useState([]);

  const [findChatsById, result] = useLazyQuery(FIND_CHAT_BY_ID);

  const handleChat = (friend: any) => {
    findChatsById({ variables: { findChatsByIdId: friend.id } });
  };

  useEffect(() => {
    if (data) {
      setFriends(data.getCurrentUser.friends);
    }
    if (result.data) {
      openChat(result.data.findChatsById[0]);
    }
  }, [data, result]);

  if (loading) return <div>loading......</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <div className="usersList">
      <div className="searchUser">
        <Input type="search" name="chatSearch" id="chatSearch" />
      </div>

      <List>
        {friends &&
          friends.map((friend: any) => {
            return (
              <ListItem key={friend.id}>
                <ListItemBox
                  onClick={() => handleChat(friend)}
                  onKeyDown={() => handleChat(friend)}
                  role="button"
                  tabIndex={0}
                >
                  <AvatarImg
                    src={friend.avatarImg ? friend.avatarImg : avatarDefault}
                    alt="avatar"
                  />
                  {friend.username}
                </ListItemBox>
              </ListItem>
            );
          })}
      </List>
    </div>
  );
}

export default FriendList;
