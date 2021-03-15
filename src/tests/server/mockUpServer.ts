import { ChatRoom } from '../../components/chatPage/messageList/messageCardTypes';
import { testData } from '../data/userdata';
import { chatrooms } from '../data/messagedata';
import { ChatRoomData } from '../../features/chatData/chatDataTypes';

const MockUpServer = class {
  delay: number;
  constructor(delay: number) {
    this.delay = delay;
  }

  getChatRooms(): Promise<ChatRoom[]> {
    return this._resolve(testData) as Promise<ChatRoom[]>;
  }

  sendMessage(message: string) {
    return this._resolve(message);
  }

  fetchChatData(chatroomId: string): Promise<ChatRoomData> {
    return this._resolve(chatrooms[chatroomId]) as Promise<ChatRoomData>;
  }

  userLogin() {
    return this._resolve({
      userId: 'TEST_USER_ID',
      userName: 'TEST_USER_NAME',
      avatarUrl: 'assets/antonio.jpg',
    });
  }

  _resolve(data: any) {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve(data);
      }, this.delay);
    });
  }
};

export default new MockUpServer(1500);
