import { configureStore } from '@reduxjs/toolkit';

import chatroomReducer from '../features/chatroom/chatroomSlice';
import authReducer from '../features/auth/authSlice';
import emojiReducer from '../features/emoji/emojiSlice';
import themeReducer from '../features/theme/themeSlice';

const store = configureStore({
  reducer: {
    chatroom: chatroomReducer,
    auth: authReducer,
    emoji: emojiReducer,
    theme: themeReducer,
  },
});

export type Dispatch = typeof store.dispatch;

export default store;
