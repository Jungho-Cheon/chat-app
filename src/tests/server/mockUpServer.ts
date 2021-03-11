import { ChatRoom } from '../../components/messageList/messageCardTypes';
import { testData } from '../data/userdata';

const MockUpServer = class {
  delay: number;
  constructor(delay: number) {
    this.delay = delay;
  }

  getChatRooms(): Promise<ChatRoom[]> {
    return new Promise((resolve, _) => {
      setTimeout(() => {
        resolve(testData);
      }, this.delay);
    });
  }
};

export default new MockUpServer(1500);
