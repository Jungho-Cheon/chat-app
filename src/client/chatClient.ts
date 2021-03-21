import { Chatroom } from '../components/chatPage/messageList/messageCardTypes';
import ChatroomType, {
  ReadCheckChatroomProps,
  SendMessageProps,
} from '../features/chatroom/chatroomTypes';

import {} from '../features/chatroom/chatroomSlice';

const ChatClient = class {
  hostUrl: string;
  constructor(hostUrl: string) {
    this.hostUrl = hostUrl;
  }
  async sendMessage(sendMessage: SendMessageProps): Promise<any> {
    // const {chatroomId, email, message} = sendMessage
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
