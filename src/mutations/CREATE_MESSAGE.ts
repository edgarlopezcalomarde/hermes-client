import { gql } from "@apollo/client";

export const CREATE_MESSAGE = gql`
mutation Mutation($text: String, $receiver: String, $sender: String) {
  createMessage(text: $text, receiver: $receiver, sender: $sender) {
    createdAt
    id
    read
    receiver
    text
    sender
  }
}
`;

