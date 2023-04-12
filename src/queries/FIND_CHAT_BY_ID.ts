import { gql } from '@apollo/client';

export const FIND_CHAT_BY_ID = gql`
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
