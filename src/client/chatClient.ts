import { Chatroom } from '../components/chatPage/messageList/messageCardTypes';
import ChatroomType, {
  ReadCheckChatroomProps,
  RequestNextMessagePageProps,
  SendMessageProps,
} from '../features/chatroom/chatroomTypes';

import {} from '../features/chatroom/chatroomSlice';

const ChatClient = class {
  hostUrl: string;
  constructor(hostUrl: string) {
    this.hostUrl = hostUrl;
  }
  async sendMessage(sendMessage: SendMessageProps): Promise<any> {
    const response = await fetch(this.hostUrl + '/message', {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendMessage),
    });
    return await response.json();
  }
  // Chatroom의 목록을 요청
  async getChatroomList(email: string): Promise<Chatroom[]> {
    const response = await fetch(this.hostUrl + `/chatroom?email=${email}`, {
      method: 'get',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  }
  // 로그인시 채팅방의 초기 데이터를 요청
  async fetchChatroomInfo(chatroomId: string): Promise<ChatroomType> {
    const response = await fetch(this.hostUrl + `/chatroom`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatroomId }),
    });
    return await response.json();
  }
  // 메세지 페이지 요청
  async requestNextMessagePage(
    requestNextMessagePageProps: RequestNextMessagePageProps
  ): Promise<ChatroomType> {
    const { chatroomId, page } = requestNextMessagePageProps;
    const response = await fetch(
      this.hostUrl + `/chatroom?chatroomId=${chatroomId}&page=${page}`,
      {
        method: 'get',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('response', response);
    return await response.json();
  }
  async readCheckChatroom(
    readCheckChatroomProps: ReadCheckChatroomProps
  ): Promise<ChatroomType> {
    const response = await fetch(this.hostUrl + `/chatroom/check`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(readCheckChatroomProps),
    });
    return await response.json();
  }
};

export default ChatClient;
