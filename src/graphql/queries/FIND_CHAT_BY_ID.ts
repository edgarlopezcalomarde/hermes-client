import { gql } from '@apollo/client';

const FIND_CHAT_BY_ID = gql`
  query Query($findChatsByIdId: String) {
    findChatsById(id: $findChatsByIdId) {
      id
      participants {
        id
        username
      }
    }
  }
`;

export default FIND_CHAT_BY_ID;
