import { gql } from '@apollo/client';
import { IMessage } from '../../models/message';

const NEW_CHAT_MESSAGE_SUBSCRIPTION = gql`
  subscription NewChatMessageSubscription {
    newChatMessage {
      createdAt
      id
      read
      receiver
      sender
      text
      image
    }
  }
`;

export default NEW_CHAT_MESSAGE_SUBSCRIPTION;

export interface INewChatMessageSubscription {
  newChatMessage: [IMessage];
}
