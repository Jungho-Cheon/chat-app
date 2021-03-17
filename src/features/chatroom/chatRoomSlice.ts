import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { io } from 'socket.io-client';

import Client from '../../client/chatClient';
import ChatroomType, {
  ChatRoomState,
  FETCH_CHATROOM_STATUS,
  Message,
  SendMessageProps,
} from './chatroomTypes';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';
const client = new Client(SERVER_URL.toString());

const initialState: ChatRoomState = {
  status: FETCH_CHATROOM_STATUS.IDLE,
  currentChatroomId: '',
  socketId: '',
  data: {},
};

// Async Thunks
// 채팅방 정보 초기화
export const fetchChatroomInfo = createAsyncThunk(
  'chatroom/fetchChatRoom',
  async (chatroomId: string): Promise<ChatroomType> => {
    return await client.fetchChatroomInfo(chatroomId);
  }
);

// 메세지 전송
// export const sendMessage = createAsyncThunk(
//   'chatroom/sendMessage',
//   async (sendMessageProps: SendMessageProps) => {
//     const response = await client.sendMessage(sendMessageProps);
//   }
// );

export const chatroomSlice = createSlice({
  name: 'chatroom',
  initialState,
  reducers: {
    changeChatroom(state, { payload }) {
      state.currentChatroomId = payload;
    },
    clearChatroom(state) {
      state.currentChatroomId = '';
    },
    initSocketId(state, action: PayloadAction<string>) {
      state.socketId = action.payload;
    },
    sendMessage(state, action: PayloadAction<SendMessageProps>) {
      const { chatroomId, email, message } = action.payload;
      if (state.data.hasOwnProperty(chatroomId)) {
        // const newState = {...state.data[chatroomId]}
        const chatMessages = state.data[chatroomId].chatMessages;
        if (
          chatMessages.length === 0 ||
          chatMessages[chatMessages.length - 1].email !== email
        ) {
          chatMessages.push({
            email,
            messages: [message],
          });
        } else {
          chatMessages[chatMessages.length - 1].messages.push(message);
        }
        state.data = { ...state.data };
      }
    },
    sendComplete(
      state,
      action: PayloadAction<{ chatroomId: string; messageId: string }>
    ) {
      const { chatroomId, messageId } = action.payload;
      console.log(chatroomId, messageId);
      state.data[chatroomId].chatMessages.forEach(chatMessage =>
        chatMessage.messages.forEach(message => {
          if (message.messageId === messageId) message.isComplete = true;
        })
      );
    },
    receiveMessage(state, action: PayloadAction<SendMessageProps>) {
      const { chatroomId, email, message } = action.payload;
      if (state.data.hasOwnProperty(chatroomId)) {
        const chatMessages = state.data[chatroomId].chatMessages;
        if (
          chatMessages.length === 0 ||
          chatMessages[chatMessages.length - 1].email !== email
        ) {
          state.data[chatroomId].chatMessages.push({
            email,
            messages: [message],
          });
        } else {
          chatMessages[chatMessages.length - 1].messages.push(message);
        }
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchChatroomInfo.fulfilled, (state, { payload }) => {
      payload.chatMessages.forEach(chatMessage =>
        chatMessage.messages.forEach(message => {
          message.isComplete = true;
        })
      );
      state.data[payload.chatroomId] = payload;
    });
  },
});

// selecters
export const getAllChatrooms = function (
  state: RootStateOrAny
): ChatroomType[] {
  return state.chatroom.data;
};
export const getCurrentChatroomId = (state: RootStateOrAny): string => {
  return state.chatroom.currentChatroomId;
};
export const getCurrentChatroom = (state: RootStateOrAny): ChatroomType => {
  const currentChatroom = state.chatroom.data[state.chatroom.currentChatroomId];
  if (!currentChatroom)
    return {
      chatroomId: '',
      chatMessages: [],
      participants: [],
    };
  return currentChatroom;
};

export const {
  changeChatroom,
  clearChatroom,
  initSocketId,
  sendMessage,
  sendComplete,
  receiveMessage,
} = chatroomSlice.actions;

export default chatroomSlice.reducer;
