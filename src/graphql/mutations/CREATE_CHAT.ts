import { gql } from '@apollo/client';

const CREATE_CHAT = gql`
  mutation Mutation($participants: [String]) {
    createChat(participants: $participants) {
      id
      participants {
        id
        username
      }
    }
  }
`;

export default CREATE_CHAT;
