export enum MESSAGE_TYPE {
  Text = 'TEXT',
  File = 'FILE',
  Url = 'URL',
}

export interface ChatMessage {
  messageId: string;
  type: MESSAGE_TYPE;
  message: string;
}

export interface Participant {
  [userId: string]: { avatarUrl: string; isOnline: boolean };
}

export interface ChatData {
  userId: string;
  messages: ChatMessage[];
}

export interface ChatRoomData {
  participants: Participant;
  chatdata: ChatData[];
}

export interface ChatDataState {
  currentChatRoomId: boolean | string;
  data: {
    [ChatRoomId: string]: ChatRoomData;
  };
}
