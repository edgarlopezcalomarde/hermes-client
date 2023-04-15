import React from 'react';

function ContactList({
  data,
  handleChat,
  currentUser,
}: {
  data: any;
  handleChat: (chat: any) => void;
  currentUser: any;
}) {
  return (
    <div className="contactList">
      <div className="searchContact">
        <input
          type="search"
          name="chatSearch"
          id="chatSearch"
          className="inputSearch"
        />
      </div>

      <div className="list">
        {data &&
          data.findChatsById.map((chat: any) => {
            const { participants } = chat;
            const reciver = participants.find(
              (participant: any) => participant.id !== currentUser.id,
            );

            return (
              <li key={chat.id} className="contact">
                <div
                  onClick={() => handleChat(chat)}
                  onKeyDown={() => handleChat(chat)}
                  role="button"
                  tabIndex={0}
                >
                  {reciver.username}
                </div>
              </li>
            );
          })}
      </div>
    </div>
  );
}

export default ContactList;
