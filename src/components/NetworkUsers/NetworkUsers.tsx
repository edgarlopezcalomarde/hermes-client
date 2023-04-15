import { useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { RiAddFill } from 'react-icons/ri';
import ALL_USERS from '../../queries/ALL_USERS';
import './NetworkUsers.css';
import SEND_FRIEND_REQUEST from '../../mutations/SEND_FRIEND_REQUEST';

function NetworkUsers() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser')!);

  const { data, loading, error } = useQuery(ALL_USERS);

  const [errorMessage, setErrorMessage] = useState('');

  const [sendFriendRequest, result] = useMutation(SEND_FRIEND_REQUEST, {
    onError: (errorMess) => {
      setErrorMessage(errorMess.graphQLErrors[0].message);
      console.log(errorMess);
    },
    refetchQueries: [
      {
        query: ALL_USERS,
      },
    ],
  });

  const handleClick = (id: string) => {
    sendFriendRequest({ variables: { toId: id } });
    console.log(result);
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
        {data &&
          data.allUsers
            .filter((user: any) => user.id !== currentUser.id)
            .map((user: any) => {
              // console.log('friendRequest', user.friendRequest);
              const userRequest = user.friendRequest.filter(
                (request: any) => request.from.id === currentUser.id,
              )[0];

              console.log(userRequest);

              return (
                <li key={user.id} className="user">
                  <div>
                    {user.username}
                    <div
                      onClick={() => handleClick(user.id)}
                      onKeyDown={() => handleClick(user.id)}
                      role="button"
                      tabIndex={0}
                    >
                      {userRequest !== undefined ? (
                        userRequest.status
                      ) : (
                        <RiAddFill />
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
      </div>
    </div>
  );
}

export default NetworkUsers;
