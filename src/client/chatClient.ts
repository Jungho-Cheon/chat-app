import { Chatroom } from '../components/chatPage/messageList/messageCardTypes';
import ChatroomType, {
  ReadCheckChatroomProps,
  RequestNextMessagePageProps,
  SendMessageProps,
  UploadFileResponse,
  UrlData,
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
  // 사진, 파일 업로드 -> gcp cloud storage
  async uploadFile(
    chatroomId: string,
    file: File
  ): Promise<UploadFileResponse> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(this.hostUrl + `/chatroom/file`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        chatroomId,
      },
      body: formData,
    });
    return await response.json();
  }
  // url preview data 요청
  async getLinkPreview(url: string): Promise<UrlData> {
    try {
      const response = await fetch(this.hostUrl + `/chatroom/url`, {
        method: 'post',
        mode: 'cors',
        cache: 'default',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      return await response.json();
    } catch (err) {
      console.error(err);
      return Promise.reject(err);
    }
  }
};

export default ChatClient;
