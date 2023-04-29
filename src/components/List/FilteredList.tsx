import { useState } from 'react';
import Input from '../Input/Input';

function FilterableList({
  listTitle,
  initialList,
  renderItem,
  filtermessage,
  bigSize,
}: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredList = initialList.filter((item: any) =>
    item.username
      ? item.username.toLowerCase().includes(searchTerm.toLowerCase())
      : item.from.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="mt-1">
      {filtermessage && (
        <Input
          id="buscarcontactos"
          label="buscar"
          onChange={({ target }) => setSearchTerm(target.value)}
          placeholder={filtermessage}
          type="search"
          value={searchTerm}
          required
        />
      )}

      <div className="flex flex-row items-center justify-between text-xs mt-3">
        <span className="font-bold text-2xl">{listTitle}</span>
        <span className="flex items-center justify-center bg-secondary border border-quaternary  h-4 w-4 rounded-full">
          {filteredList.length}
        </span>
      </div>

      <ul
        className={
          bigSize
            ? 'flex flex-col space-y-1 mt-4 -mx-2 h-auto overflow-y-auto pl-1'
            : 'flex flex-col space-y-1 mt-4 -mx-2 h-52 overflow-y-auto pl-1'
        }
      >
        {filteredList.map((item: any) => (
          <li key={item.id}>{renderItem(item)}</li>
        ))}
      </ul>
    </div>
  );
}

export default FilterableList;
