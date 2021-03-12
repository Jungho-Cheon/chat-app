import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';

// MockUp Server
import Server from '../../tests/server/mockUpServer';

// types
import { ChatDataState, ChatRoomData, MESSAGE_TYPE } from './chatDataTypes';

export interface sendMessageProps {
  chatroomId: string;
  userId: string;
  message: string;
}

// 메세지 전송
export const sendMessage = createAsyncThunk(
  'chatdata/sendMessage',
  async ({ chatroomId, userId, message }: sendMessageProps) => {
    // 1. 채팅창에 추가
    // const dispatch = useDispatch();
    // dispatch(addMessage({ chatroomId, message }));
    // 2. 서버에 전송
    const response = await Server.sendMessage(message);

    // 3. 서버에 전송 완료될때 까지 로딩 표시, 전송 완료 후 완료 표시
    return message;
  }
);

// 채팅방 클릭시 채팅방 정보 패치
export const fetchChatData = createAsyncThunk(
  'chatdata/fetchChatData',
  async (chatroomId: string) => {
    const response = await Server.fetchChatData(chatroomId);
    return { chatroomId, chatroomData: response as ChatRoomData };
  }
);

const initialState: ChatDataState = {
  currentChatRoomId: false,
  data: {},
};

export const chatDataSlice = createSlice({
  name: 'chatdata',
  initialState,
  reducers: {
    changeChatRoom(state, action:PayloadAction<string>) {
      state.currentChatRoomId = action.payload;
      return state;
    },
    addMessage(state, action: PayloadAction<sendMessageProps>) {
      const { chatroomId, userId, message } = action.payload;
      const charRoom = state.data[chatroomId];
      console.log('addMessage Reducer', chatroomId, message);
      // 마지막 메세지 확인
      const chatdataIdx = charRoom.chatdata.length;
      const { userId: lastMessageUserId, messages } = charRoom.chatdata[
        chatdataIdx > 0 ? chatdataIdx - 1 : 0
      ];
      if (lastMessageUserId === userId) {
        messages.push({
          messageId: nanoid(),
          type: MESSAGE_TYPE.Text,
          message,
        });
      } else {
        charRoom.chatdata.push({
          messages: [{ messageId: nanoid(), type: MESSAGE_TYPE.Text, message }],
          userId,
        });
      }
      return state;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchChatData.fulfilled, (state, { payload }) => {
      state.currentChatRoomId = payload.chatroomId;
      state.data[payload.chatroomId] = payload.chatroomData;
      console.log(state);
    });
  },
});

// 현재 채팅방 정보 셀렉터
export const chatdataSelector = (state: RootStateOrAny): ChatDataState =>
  state.chatdata;



// action
export const { addMessage, changeChatRoom } = chatDataSlice.actions;

export default chatDataSlice.reducer;
