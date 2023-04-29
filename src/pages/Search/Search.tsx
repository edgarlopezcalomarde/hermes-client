import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import ALL_USERS from '../../graphql/queries/ALL_USERS';
import useLocalStorage from '../../utils/useLocalStorage';
import FilterableList from '../../components/List/FilteredList';
import NetworkUserItem from '../../components/List/NetworkUserItem';
import SEND_FRIEND_REQUEST from '../../graphql/mutations/SEND_FRIEND_REQUEST';

function Search() {
  const [currentUser] = useLocalStorage('current-user', '');
  const [networkUsers, setNetworkUsers] = useState([]);
  const allUsersQuery = useQuery(ALL_USERS);

  useEffect(() => {
    if (allUsersQuery.data) {
      setNetworkUsers(
        allUsersQuery.data.allUsers.filter(
          (user: any) => user.id !== currentUser.id,
        ),
      );
    }
  }, [allUsersQuery.data]);

  return (
    <div className="flex flex-row h-full w-full overflow-x-hidden justify-center items-center">
      <div>
        <h2>HERMEARCH</h2>

        <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
          <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src="/docs/images/people/profile-picture-1.jpg"
                  alt="avatar"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  Neil Sims
                </p>
              </div>
            </div>
          </li>
          ;
        </ul>
      </div>
    </div>
  );
}

export default Search;
