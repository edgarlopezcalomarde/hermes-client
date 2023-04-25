import { useState } from 'react';

function FilterableList({ listTitle, initialList, renderItem }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredList = initialList.filter((item: any) =>
    item.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <h2>{listTitle}</h2>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <ul>
        {filteredList.map((item: any) => (
          <li key={item.id}>{renderItem(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default FilterableList;
