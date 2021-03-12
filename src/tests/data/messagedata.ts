import { nanoid } from '@reduxjs/toolkit';
import {
  ChatRoomData,
  MESSAGE_TYPE,
} from '../../features/chatData/chatDataTypes';

export const chatrooms: { [key: string]: ChatRoomData } = {
  ChatRoom1: {
    participants: {
      'Johnson Park': {
        avatarUrl: 'assets/card-avatar-1.jpg',
        isOnline: false,
      },
    },
    chatdata: [
      {
        userId: 'Johnson Park',
        messages: [
          {
            message: 'hello Cheon',
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
          {
            message: 'This is too hard.',
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
          {
            message: 'Take this man',
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
          {
            message: '따오기.avi',
            messageId: nanoid(),
            type: MESSAGE_TYPE.File,
          },
        ],
      },
      {
        userId: 'TEST_USER_ID',
        messages: [
          {
            message: "oh bro. what's this?",
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
          {
            message: '이게 뭐냐고????',
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
          {
            message: '따오기2.avi',
            messageId: nanoid(),
            type: MESSAGE_TYPE.File,
          },
        ],
      },
      {
        userId: 'Johnson Park',
        messages: [
          {
            message: 'never mind~',
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
          {
            message: 'soju soju~',
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
        ],
      },
    ],
  },
  ChatRoom2: {
    participants: {
      'Tom Anderson': { avatarUrl: 'assets/card-avatar-2.jpg', isOnline: true },
    },
    chatdata: [
      {
        userId: 'Tom Anderson',
        messages: [
          {
            message: 'hello Cheon',
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
          {
            message: 'This is too hard.',
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
          {
            message: 'Take this man',
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
          {
            message: '따오기.avi',
            messageId: nanoid(),
            type: MESSAGE_TYPE.File,
          },
        ],
      },
      {
        userId: 'TEST_USER_ID',
        messages: [
          {
            message: "oh bro. what's this?",
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
          {
            message: '이게 뭐냐고????',
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
          {
            message: '따오기2.avi',
            messageId: nanoid(),
            type: MESSAGE_TYPE.File,
          },
        ],
      },
      {
        userId: 'Tom Anderson',
        messages: [
          {
            message: 'never mind~',
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
          {
            message: 'soju soju~',
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
        ],
      },
    ],
  },
  ChatRoom3: {
    participants: {
      Anna: { avatarUrl: 'assets/card-avatar-3.jpg', isOnline: true },
    },
    chatdata: [
      {
        userId: 'Anna',
        messages: [
          {
            message: 'hello Cheon',
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
          {
            message: 'This is too hard.',
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
          {
            message: 'Take this man',
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
          {
            message: '따오기.avi',
            messageId: nanoid(),
            type: MESSAGE_TYPE.File,
          },
        ],
      },
      {
        userId: 'TEST_USER_ID',
        messages: [
          {
            message: "oh bro. what's this?",
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
          {
            message: '이게 뭐냐고????',
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
          {
            message: '따오기2.avi',
            messageId: nanoid(),
            type: MESSAGE_TYPE.File,
          },
        ],
      },
      {
        userId: 'Anna',
        messages: [
          {
            message: 'never mind~',
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
          {
            message: 'soju soju~',
            messageId: nanoid(),
            type: MESSAGE_TYPE.Text,
          },
        ],
      },
    ],
  },
};
