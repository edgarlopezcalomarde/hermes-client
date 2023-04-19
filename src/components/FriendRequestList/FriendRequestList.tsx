import { useMutation, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';

import { AiOutlineCheck } from 'react-icons/ai';
import { ImCancelCircle } from 'react-icons/im';

import CURRENT_USER_LOGGED from '../../graphql/queries/CURRENT_USER_LOGGED';
import ACEEPT_FRIEND_REQUEST from '../../graphql/mutations/ACEEPT_FRIEND_REQUEST';

function FriendRequestList() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')!);
  const { data, loading, error } = useQuery(CURRENT_USER_LOGGED);

  const [acceptFriendRequest, result] = useMutation(ACEEPT_FRIEND_REQUEST, {
    refetchQueries: [
      {
        query: CURRENT_USER_LOGGED,
      },
    ],
    onError: (errore: any) => {
      console.log(errore);
    },
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    if (data) {
      setFriendRequests(data.getCurrentUser.friendRequest);
    }
  }, [data]);

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

  if (loading) return <div>loading......</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <div className="usersList">
      <div>{errorMessage}</div>

      <div className="searchUser">
        <input
          type="search"
          name="chatSearch"
          id="chatSearch"
          className="inputSearch"
        />
      </div>

      <div className="list">
        {friendRequests &&
          friendRequests.map((friendrequest: any) => {
            return (
              <li key={friendrequest.id} className="user">
                <div>
                  <div>{friendrequest.from.username}</div>

                  <div>{friendrequest.status}</div>

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
                </div>
              </li>
            );
          })}
      </div>
    </div>
  );
}

export default FriendRequestList;