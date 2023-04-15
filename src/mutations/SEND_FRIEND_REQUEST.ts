import { gql } from '@apollo/client';

const SEND_FRIEND_REQUEST = gql`
  mutation Mutation($toId: String) {
    sendFriendRequest(toId: $toId) {
      id
    }
  }
`;

export default SEND_FRIEND_REQUEST;
