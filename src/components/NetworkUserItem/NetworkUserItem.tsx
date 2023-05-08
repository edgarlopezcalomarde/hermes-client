import React from 'react';
import { RiAddFill } from 'react-icons/ri';
import { useMutation } from '@apollo/client';

import useLocalStorage from '../../utils/useLocalStorage';

import ALL_USERS from '../../graphql/queries/ALL_USERS';
import SEND_FRIEND_REQUEST from '../../graphql/mutations/SEND_FRIEND_REQUEST';

function NetworkUserItem({ user, friends }: any) {
  const [currentUser] = useLocalStorage('current-user', '');

  const [sendFriendRequest] = useMutation(SEND_FRIEND_REQUEST, {
    onError: (errorMess: any) => {
      console.log(errorMess);
    },
    refetchQueries: [
      {
        query: ALL_USERS,
      },
    ],
  });

  const userRequest = user.friendRequest.filter(
    (request: any) => request.from.id === currentUser.id,
  )[0];

  const handleClick = async (id: string) => {
    const { data } = await sendFriendRequest({ variables: { toId: id } });

    if (data) {
      console.log('sended');
    }
  };

  const isFriend = () => {
    let userStatus = '';
    if (userRequest !== undefined) {
      userStatus = userRequest.status;
    } else if (
      friends.filter((friend: any) => friend.id === user.id).length > 0
    ) {
      userStatus = 'accepted';
    }

    return userStatus;
  };

  return (
    <div className="flex justify-between items-center p-2 border rounded ">
      {user.username}
      <div
        onClick={() => handleClick(user.id)}
        onKeyDown={() => handleClick(user.id)}
        role="button"
        tabIndex={0}
        className="font-medium"
      >
        {isFriend() !== '' ? isFriend() : <RiAddFill className="text-2xl" />}
      </div>
    </div>
  );
}

export default NetworkUserItem;
