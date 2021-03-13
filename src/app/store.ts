import { configureStore } from '@reduxjs/toolkit';

import chatroomReducer from '../features/chatroom/chatRoomSlice';
import chatdataReducer from '../features/chatData/chatDataSlice';
import loginReducer from '../features/login/loginSlice';
import emojiReducer from '../features/emoji/emojiSlice';
import themeReducer from '../features/theme/themeSlice';

const store = configureStore({
  reducer: {
    chatroom: chatroomReducer,
    chatdata: chatdataReducer,
    login: loginReducer,
    emoji: emojiReducer,
    theme: themeReducer,
  },
});

export type Dispatch = typeof store.dispatch;

export default store;
