export interface ChatroomRequest {
  chatroomId: string;
}

export interface Message {
  messageId: string;
  message: string;
  type: string;
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
  data: Record<string, ChatroomType>;
}

export interface SendMessageProps {
  chatroomId: string;
  email: string;
  message: string;
}
