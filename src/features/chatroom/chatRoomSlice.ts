import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';

import Client from '../../client/chatClient';
import ChatroomType, { ChatRoomState, FETCH_CHATROOM_STATUS, SendMessageProps } from './chatroomTypes';

// import { Map } from 'immutable';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';
const client = new Client(SERVER_URL.toString());


const initialState: ChatRoomState = {
  status: FETCH_CHATROOM_STATUS.IDLE,
  currentChatroomId: '',
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
export const sendMessage = createAsyncThunk(
  'chatroom/sendMessage',
  async (sendMessageProps: SendMessageProps) => {
    const response = await client.sendMessage(sendMessageProps);
  }
);

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
  },
  extraReducers: builder => {
    builder.addCase(fetchChatroomInfo.fulfilled, (state, { payload }) => {
      state.data[payload.chatroomId] = payload;
    });
  },
});

// selecters
export const selectChatRooms = (state: RootStateOrAny): ChatroomType[] => {
  return Array.from(Object.values(state.chatroom.data));
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

export const { changeChatroom, clearChatroom } = chatroomSlice.actions;

export default chatroomSlice.reducer;
