import { useState } from 'react';
import { Input } from '../../styledComponents/Input';

function FilterableList({ listTitle, initialList, renderItem }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredList = initialList.filter((item: any) =>
    item.username
      ? item.username.toLowerCase().includes(searchTerm.toLowerCase())
      : item.from.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <Input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <div className="flex flex-row items-center justify-between text-xs mt-4">
        <span className="font-bold text-2xl">{listTitle}</span>
        <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
          {filteredList.length}
        </span>
      </div>

      <ul className="flex flex-col space-y-1 mt-4 -mx-2 h-56 overflow-y-auto">
        {filteredList.map((item: any) => (
          <li key={item.id}>{renderItem(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default FilterableList;
