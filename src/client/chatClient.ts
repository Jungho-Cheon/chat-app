import { Chatroom } from '../components/chatPage/messageList/messageCardTypes';
import ChatroomType, {
  MediaPreviewResponse,
  ReadCheckChatroomProps,
  RequestNextMessagePageProps,
  SendMessageProps,
  UploadFileResponse,
  UrlData,
} from '../features/chatroom/chatroomTypes';

import {} from '../features/chatroom/chatroomSlice';

const ChatClient = class {
  hostURL: string;
  constructor(hostURL: string) {
    this.hostURL = hostURL;
  }
  async sendMessage(sendMessage: SendMessageProps): Promise<any> {
    const response = await fetch(this.hostURL + '/message', {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sendMessage),
    });
    return response.json();
  }
  // Chatroom의 목록을 요청
  async getChatroomList(email: string): Promise<Chatroom[]> {
    const response = await fetch(this.hostURL + `/chatroom?email=${email}`, {
      method: 'get',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  }
  // 로그인시 채팅방의 초기 데이터를 요청
  async fetchChatroomInfo(chatroomId: string): Promise<ChatroomType> {
    const response = await fetch(this.hostURL + `/chatroom`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatroomId }),
    });
    return response.json();
  }

  // 로그인시 채팅방의 미디어 타입 메세지의 파일 URL 요청
  async fetchMediaPreviews(chatroomId: string): Promise<MediaPreviewResponse> {
    const response = await fetch(this.hostURL + `/chatroom/media`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ chatroomId }),
    });
    return response.json();
  }
  // 메세지 페이지 요청
  async requestNextMessagePage(
    requestNextMessagePageProps: RequestNextMessagePageProps
  ): Promise<ChatroomType> {
    const { chatroomId, page } = requestNextMessagePageProps;
    const response = await fetch(
      this.hostURL + `/chatroom?chatroomId=${chatroomId}&page=${page}`,
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
    return response.json();
  }
  async readCheckChatroom(
    readCheckChatroomProps: ReadCheckChatroomProps
  ): Promise<ChatroomType> {
    const response = await fetch(this.hostURL + `/chatroom/check`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(readCheckChatroomProps),
    });
    return response.json();
  }
  // 사진, 파일 업로드 -> gcp cloud storage
  async uploadFile(
    chatroomId: string,
    file: File
  ): Promise<UploadFileResponse> {
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(this.hostURL + `/chatroom/file`, {
      method: 'post',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        chatroomId,
      },
      body: formData,
    });
    return response.json();
  }
  // url preview data 요청
  async getLinkPreview(url: string): Promise<UrlData> {
    try {
      const response = await fetch(this.hostURL + `/chatroom/url`, {
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
