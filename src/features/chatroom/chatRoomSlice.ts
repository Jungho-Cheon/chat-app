import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import { ChatRoom } from '../../components/chatPage/messageList/messageCardTypes';

// MockUp Server
import Server from '../../tests/server/mockUpServer';

enum FETCH_CHATROOM_STATUS {
  IDLE,
  PENDING,
  COMPLETED,
}

interface ChatRoomState {
  status: FETCH_CHATROOM_STATUS;
  data: ChatRoom[];
}

const initialState: ChatRoomState = {
  status: FETCH_CHATROOM_STATUS.IDLE,
  data: [] as ChatRoom[],
};

export const fetchChatRoom = createAsyncThunk(
  'chatRoom/fetchChatRoom',
  async () => {
    const response = await Server.getChatRooms();
    return response as ChatRoom[];
  }
);

export const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchChatRoom.fulfilled, (state, { payload }) => {
      state.data.push(...payload);
    });
  },
});

// selecters
export const selectChatRooms = (state: RootStateOrAny): ChatRoom[] => {
  return state.chatroom.data;
};

export default chatRoomSlice.reducer;
