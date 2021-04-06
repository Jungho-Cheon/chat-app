import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
// client
import chatClient from '../../client/chatClient';
// socket
import socket from '../../socket/socket';
// utils
import { getLastElement } from '../../utils/arrayUtils';
import { getCurrentDate } from '../../utils/time';
//types
import ChatroomType, {
  ChatRoomState,
  CheckReadMessageProps,
  CompleteMessageProps,
  FETCH_CHATROOM_STATUS,
  MediaPreviewType,
  ReadCheckChatroomProps,
  RequestNextMessagePageProps,
  SendMessageProps,
} from './chatroomTypes';

const initialState: ChatRoomState = {
  status: FETCH_CHATROOM_STATUS.IDLE,
  currentChatroomId: '',
  socketId: '',
  data: {},
};

const getLastMessageDate = (chatroom: ChatroomType): string => {
  const lastChatMessage = getLastElement(chatroom.chatMessages);
  if (lastChatMessage === undefined) return getCurrentDate();
  const lastMessage = getLastElement(lastChatMessage.messages);
  if (lastMessage === undefined) return getCurrentDate();
  return lastMessage.insertDate || getCurrentDate();
};

const compareTime = (a: ChatroomType, b: ChatroomType) => {
  return (
    new Date(b.lastMessageDate).getTime() -
    new Date(a.lastMessageDate).getTime()
  );
};
// Async Thunks
// 채팅방 정보 초기화
export const fetchChatroomInfo = createAsyncThunk(
  'chatroom/fetchChatRoomInfo',
  async (chatroomId: string, { getState, dispatch }): Promise<ChatroomType> => {
    const { auth } = getState() as {
      auth: { userData: { email: string }; accessToken: string };
    };
    const email = auth.userData.email;
    const accessToken = auth.accessToken;
    const response = await chatClient.fetchChatroomInfo(
      chatroomId,
      accessToken,
      dispatch
    );
    let unreadCount = 0;
    response.chatMessages.forEach(chatMessage =>
      chatMessage.messages.forEach(message => {
        // message.isComplete = true;
        !message.readUsers?.includes(email) && unreadCount++;
      })
    );
    response.unreadCount = unreadCount;
    response.currentPage = 1;
    response.mediaPreviews = new Array<MediaPreviewType>();
    response.lastMessageDate = getLastMessageDate(response);
    console.log(response.participants, response.lastMessageDate);
    return response;
  }
);

// media preview 요청
export const fetchMediaPreviews = createAsyncThunk(
  'chatroom/fetchMediaPreviews',
  async (chatroomId: string, { getState, dispatch }) => {
    const {
      auth: { accessToken },
    } = getState() as {
      auth: { accessToken: string };
    };
    const response = await chatClient.fetchMediaPreviews(
      chatroomId,
      accessToken,
      dispatch
    );
    const mediaPreviews = response.mediaPreviews.filter(
      preview => preview.fileUrl
    );
    return {
      chatroomId,
      mediaPreviews,
    };
  }
);

// 메세지 다음 페이지 요청
export const requestNextMessagePage = createAsyncThunk(
  'chatroom/requestNextMessagePage',
  async (
    requestNextMessagePageProps: RequestNextMessagePageProps,
    { getState, dispatch }
  ) => {
    const {
      auth: { accessToken },
    } = getState() as {
      auth: { accessToken: string };
    };
    const response = await chatClient.requestNextMessagePage(
      requestNextMessagePageProps,
      accessToken,
      dispatch
    );
    return response;
  }
);

// 채팅방의 모든 메세지 읽음 처리
export const checkOutChatroom = createAsyncThunk(
  'chatroom/checkOutChatroom',
  async (readCheckChatroomProps: ReadCheckChatroomProps, { getState, dispatch }) => {
    const {
      auth: { accessToken },
    } = getState() as {
      auth: { accessToken: string };
    };
    const response = await chatClient.readCheckChatroom(
      readCheckChatroomProps,
      accessToken,
      dispatch
    );
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
      console.log('sendMessage -> message', message);
      if (state.data.hasOwnProperty(chatroomId)) {
        const chatroom = state.data[chatroomId];
        const chatMessages = chatroom.chatMessages;
        chatroom.lastMessageDate = getCurrentDate();
        // 메세지가 분리되는 조건(chatMessages를 새로 만듦)
        // 1. 채팅이 시작될 때
        // 2. 이전 메세지와 작성자가 다를 때
        // 3. 이전 메세지와 날짜가 다를 떄
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
          chatMessages.push({
            email,
            messages: [message],
          });
        } else {
          chatMessages[chatMessages.length - 1].messages.push(message);
        }
        // media type('IMAGE', 'VIDEO')인 경우 mediapreview에 추가한다.
        if (['IMAGE', 'VIDEO'].includes(message.messageType))
          state.data[chatroomId].mediaPreviews.push({
            email,
            fileUrl: message.fileUrl || '',
            insertDate: new Date().toString(),
            mediaId: nanoid(),
          });
      }
    },
    sendComplete(state, action: PayloadAction<CompleteMessageProps>) {
      const {
        chatroomId,
        messageId,
        insertDate,
        newMessageId,
      } = action.payload;
      state.data[chatroomId].chatMessages.find(chatMessage =>
        chatMessage.messages.forEach(message => {
          if (message.messageId === messageId) {
            // message.isComplete = true;
            message.insertDate = insertDate;
            message.messageId = newMessageId;
            return true;
          }
        })
      );
      state.data[chatroomId].mediaPreviews.find(mediaPreview => {
        if (mediaPreview.mediaId === messageId) {
          mediaPreview.insertDate = insertDate;
          mediaPreview.mediaId = newMessageId;
          return true;
        }
      });
    },
    receiveMessage(state, action: PayloadAction<SendMessageProps>) {
      const { chatroomId, email, userEmail, message } = action.payload;
      if (state.data.hasOwnProperty(chatroomId)) {
        const chatroom = state.data[chatroomId];
        const chatMessages = chatroom.chatMessages;
        chatroom.lastMessageDate = getCurrentDate();
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

        // media type('IMAGE', 'VIDEO')인 경우 mediapreview에 추가한다.
        if (['IMAGE', 'VIDEO'].includes(message.messageType))
          state.data[chatroomId].mediaPreviews.push({
            email,
            fileUrl: message.fileUrl || '',
            insertDate: message.insertDate || '',
            mediaId: message.messageId,
          });
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
    builder.addCase(fetchMediaPreviews.fulfilled, (state, { payload }) => {
      const { chatroomId, mediaPreviews } = payload;
      state.data[chatroomId].mediaPreviews = state.data[
        chatroomId
      ].mediaPreviews.concat(mediaPreviews);
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
export const getAllChatrooms = (
  state: RootStateOrAny
): Record<string, ChatroomType> => {
  return state.chatroom.data;
};

export const getChatroomPreviews = (
  state: RootStateOrAny
): { chatroomId: string; participants: string[]; unreadCount: number }[] => {
  const values = Object.values(
    state.chatroom.data as Record<string, ChatroomType>
  );
  return values.sort(compareTime).map((chatroom: ChatroomType) => {
    return {
      chatroomId: chatroom.chatroomId,
      participants: chatroom.participants,
      unreadCount: chatroom.unreadCount,
    };
  });
};

export const getCurrentChatroomId = (state: RootStateOrAny): string => {
  return state.chatroom.currentChatroomId;
};
export const getCurrentChatroom = (state: RootStateOrAny): ChatroomType => {
  const currentChatroom: ChatroomType =
    state.chatroom.data[state.chatroom.currentChatroomId];
  return currentChatroom;
};

export const getMediaPreviews = (state: RootStateOrAny): MediaPreviewType[] => {
  if (state.chatroom.currentChatroomId)
    return state.chatroom.data[state.chatroom.currentChatroomId].mediaPreviews
      .slice()
      .reverse();
  return [];
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
