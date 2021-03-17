export interface ChatroomRequest {
  chatroomId: string;
}

export interface Message {
  messageId: string;
  message: string;
  messageType: string;
  isComplete?: boolean;
}

export interface ChatData {
  email: string;
  messages: Message[];
}

export interface Participant {
  email: string;
  nickname: string;
  avatarUrl: string;
}

export default interface ChatroomType {
  chatroomId: string;
  participants: Participant[];
  chatMessages: ChatData[];
}

export enum FETCH_CHATROOM_STATUS {
  IDLE,
  PENDING,
  COMPLETED,
}

export interface ChatRoomState {
  status: FETCH_CHATROOM_STATUS;
  currentChatroomId: string;
  socketId: string;
  data: Record<string, ChatroomType>;
}

export interface SendMessageProps {
  chatroomId: string;
  email: string;
  message: Message;
}
