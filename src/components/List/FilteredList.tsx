import { useState } from 'react';

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
      {filtermessage ? (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            🔍
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-2 pl-10 text-sm 
          text-text-base border 
          focus:ring-blue-500 
          focus:border-blue-500 
          bg-secondary
          rounded
          border-quaternary
          outline-none"
            placeholder={filtermessage}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      ) : (
        ''
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
