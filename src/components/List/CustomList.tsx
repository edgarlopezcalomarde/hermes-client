import { cloneElement } from 'react';
import { Input } from '../../styledComponents/Input';
import { List } from '../FriendList/FriendListStyle';

function CustomList({ users, openChat, children }: any) {
  return (
    <div className="usersList">
      <div className="searchUser">
        <Input type="search" name="chatSearch" id="chatSearch" />
      </div>

      <List>
        {users &&
          users.map((user: any) => cloneElement(children, { user, openChat }))}
      </List>
    </div>
  );
}

export default CustomList;
