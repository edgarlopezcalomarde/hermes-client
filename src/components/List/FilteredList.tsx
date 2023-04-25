import { useState } from 'react';
import { Input } from '../../styledComponents/Input';
import { List, ListItem } from './ListStyles';

function FilterableList({ listTitle, initialList, renderItem }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredList = initialList.filter((item: any) =>
    item.username
      ? item.username.toLowerCase().includes(searchTerm.toLowerCase())
      : item.from.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <h2>{listTitle}</h2>
      <Input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <List>
        {filteredList.map((item: any) => (
          <ListItem key={item.id}>{renderItem(item)}</ListItem>
        ))}
      </List>
    </div>
  );
}

export default FilterableList;
