import { IMessage } from './message';

export interface Chat {
  participants: [import('./user').IUser];
  messages: [IMessage];
}
