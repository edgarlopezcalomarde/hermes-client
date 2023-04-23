import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

import CURRENT_USER_LOGGED from '../../graphql/queries/CURRENT_USER_LOGGED';
import FIND_CHAT_BY_ID from '../../graphql/queries/FIND_CHAT_BY_ID';
import { Input } from '../../styledComponents/Input';

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

      <div className="list">
        {friends &&
          friends.map((friend: any) => {
            return (
              <li key={friend.id} className="user">
                <div
                  onClick={() => handleChat(friend)}
                  onKeyDown={() => handleChat(friend)}
                  role="button"
                  tabIndex={0}
                >
                  {friend.username}
                </div>
              </li>
            );
          })}
      </div>
    </div>
  );
}

export default FriendList;
