import { gql } from '@apollo/client';
import { IMessage } from '../../models/message';

const NEW_MESSAGE = gql`
  subscription Subscription {
    newChatMessage {
      text
      id
      image
      read
      receiver
      sender
      createdAt
    }
  }
`;

export default NEW_MESSAGE;

export interface INewChatMessageSubscription {
  newChatMessage: [IMessage];
}
