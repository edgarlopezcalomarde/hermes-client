import { gql } from "@apollo/client";

export const ALL_MESSAGE_BETWEN_USERS = gql`
query AllMessages($userId1: String, $userId2: String) {
  allMessages(userId1: $userId1, userId2: $userId2) {
    createdAt
    id
    read
    receiver
    sender
    text
  }
}
`;
