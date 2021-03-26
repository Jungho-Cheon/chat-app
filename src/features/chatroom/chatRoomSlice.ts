import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import store from '../../app/store';

import Client from '../../client/chatClient';
import { socket } from '../../socket/socket';
import ChatroomType, {
  ChatData,
  ChatRoomState,
  CheckReadMessageProps,
  CompleteMessageProps,
  FETCH_CHATROOM_STATUS,
  Message,
  ReadCheckChatroomProps,
  RequestNextMessagePageProps,
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
  'chatroom/fetchChatRoomInfo',
  async (
    readCheckChatroomProps: ReadCheckChatroomProps
  ): Promise<ChatroomType> => {
    const { chatroomId, email } = readCheckChatroomProps;
    const response = await client.fetchChatroomInfo(chatroomId);
    console.log(response);
    let unreadCount = 0;
    response.chatMessages.forEach(chatMessage =>
      chatMessage.messages.forEach(message => {
        message.isComplete = true;
        !message.readUsers?.includes(email) && unreadCount++;
      })
    );
    response.unreadCount = unreadCount;
    response.currentPage = 1;
    return response;
  }
);
// 메세지 다음 페이지 요청
export const requestNextMessagePage = createAsyncThunk(
  'chatroom/requestNextMessagePage',
  async (requestNextMessagePageProps: RequestNextMessagePageProps) => {
    const response = await client.requestNextMessagePage(
      requestNextMessagePageProps
    );
    response.chatMessages.forEach(chatMessage =>
      chatMessage.messages.forEach(message => {
        message.isComplete = true;
      })
    );
    return response;
  }
);

// 채팅방의 모든 메세지 읽음 처리
export const checkOutChatroom = createAsyncThunk(
  'chatroom/checkOutChatroom',
  async (readCheckChatroomProps: ReadCheckChatroomProps) => {
    const response = await client.readCheckChatroom(readCheckChatroomProps);
    return response;
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
    initSocketId(state, action: PayloadAction<string>) {
      state.socketId = action.payload;
    },
    sendMessage(state, action: PayloadAction<SendMessageProps>) {
      const { chatroomId, email, message } = action.payload;
      if (state.data.hasOwnProperty(chatroomId)) {
        const chatMessages = state.data[chatroomId].chatMessages;
        if (
          chatMessages.length === 0 ||
          chatMessages[chatMessages.length - 1].email !== email ||
          new Date(
            Date.parse(
              chatMessages[chatMessages.length - 1].messages[
                chatMessages[chatMessages.length - 1].messages.length - 1
              ].insertDate || ''
            ) -
              9 * 1000 * 60 * 60
          ).getDate() !== new Date().getDate()
        ) {
          console.log('new chatMessage', new Date().getDate());
          chatMessages.push({
            email,
            messages: [message],
          });
        } else {
          chatMessages[chatMessages.length - 1].messages.push(message);
        }
      }
    },
    sendComplete(state, action: PayloadAction<CompleteMessageProps>) {
      const {
        chatroomId,
        messageId,
        insertDate,
        newMessageId,
      } = action.payload;
      state.data[chatroomId].chatMessages.forEach(chatMessage =>
        chatMessage.messages.forEach(message => {
          if (message.messageId === messageId) {
            message.isComplete = true;
            message.insertDate = insertDate;
            message.messageId = newMessageId;
          }
        })
      );
    },
    receiveMessage(state, action: PayloadAction<SendMessageProps>) {
      const { chatroomId, email, userEmail, message } = action.payload;
      if (state.data.hasOwnProperty(chatroomId)) {
        const chatMessages = state.data[chatroomId].chatMessages;
        if (state.currentChatroomId !== chatroomId) {
          state.data[chatroomId].unreadCount++;
        } else {
          socket.emit(
            'READ_MESSAGE',
            JSON.stringify({
              chatroomId: chatroomId,
              email: userEmail,
              messageId: message.messageId,
            })
          );
        }
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
    checkReadMessage(state, action: PayloadAction<CheckReadMessageProps>) {
      const { chatroomId, email, messageId } = action.payload;
      state.data[chatroomId].chatMessages.forEach(chatMessage =>
        chatMessage.messages.forEach(
          message =>
            message.messageId === messageId && message.readUsers.push(email)
        )
      );
      return state;
    },
    checkReadMessages(state, action: PayloadAction<ReadCheckChatroomProps>) {
      // 채팅방 선택시 안읽은 메시지 수 초기화 및 읽음 emit
      const { chatroomId, email } = action.payload;
      state.data[chatroomId].unreadCount = 0;
      const chatMessages = state.data[chatroomId].chatMessages;

      const unreadMessageIds: string[] = [];
      chatMessages.forEach(chatMessage =>
        chatMessage.messages.forEach(message => {
          if (!message.readUsers.includes(email)) {
            message.readUsers.push(email);
            unreadMessageIds.push(message.messageId);
          }
        })
      );
      socket.emit(
        'READ_MESSAGE',
        JSON.stringify({
          chatroomId: chatroomId,
          email: email,
          messageId: unreadMessageIds,
        })
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchChatroomInfo.fulfilled, (state, { payload }) => {
      state.data[payload.chatroomId] = payload;
      return state;
    });
    builder.addCase(checkOutChatroom.fulfilled, state => {
      return state;
    });
    builder.addCase(requestNextMessagePage.fulfilled, (state, { payload }) => {
      console.log(payload);
      state.data[payload.chatroomId].currentPage++;
      state.data[payload.chatroomId].chatMessages.unshift(
        ...payload.chatMessages
      );
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
  const currentChatroom: ChatroomType =
    state.chatroom.data[state.chatroom.currentChatroomId];
  if (!currentChatroom)
    return {
      chatroomId: '',
      unreadCount: 0,
      currentPage: 1,
      totalMessages: 0,
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
  checkReadMessage,
  checkReadMessages,
} = chatroomSlice.actions;

export default chatroomSlice.reducer;
