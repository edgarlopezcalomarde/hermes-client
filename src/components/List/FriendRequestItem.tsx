import React from 'react';

import { useMutation } from '@apollo/client';

import { AiOutlineCheck } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

import CURRENT_USER_LOGGED from '../../graphql/queries/CURRENT_USER_LOGGED';
import ACEEPT_FRIEND_REQUEST from '../../graphql/mutations/ACEEPT_FRIEND_REQUEST';
import { ListItemBox } from './ListStyles';

function FriendRequestItem({ friendrequest }: any) {
  const [acceptFriendRequest] = useMutation(ACEEPT_FRIEND_REQUEST, {
    refetchQueries: [
      {
        query: CURRENT_USER_LOGGED,
      },
    ],
    onError: (errore: any) => {
      console.log(errore);
    },
  });

  const handleClickAccept = (id: string) => {
    acceptFriendRequest({
      variables: {
        requestId: id,
      },
    });
  };

  const handleClickDecline = (id: string) => {
    console.log(id);
  };

  return (
    <button
      type="submit"
      className="flex flex-row items-centerrounded-xl w-full gap-4 p-1"
    >
      <div className="ml-2 text-sm font-semibold">
        {friendrequest.from.username}
      </div>
      <div className=" text-sm font-semibold">{friendrequest.status}</div>

      <div
        onClick={() => handleClickAccept(friendrequest.id)}
        onKeyDown={() => handleClickAccept(friendrequest.id)}
        role="button"
        tabIndex={0}
      >
        <AiOutlineCheck />
      </div>

      <div
        onClick={() => handleClickDecline(friendrequest.id)}
        onKeyDown={() => handleClickDecline(friendrequest.id)}
        role="button"
        tabIndex={0}
      >
        <ImCancelCircle />
      </div>
    </button>
  );
}

export default FriendRequestItem;
