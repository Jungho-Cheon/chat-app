import { combineReducers, configureStore } from '@reduxjs/toolkit';
import chatroomReducer from '../features/chatroom/chatroomSlice';
import authReducer from '../features/auth/authSlice';

import themeReducer from '../features/theme/themeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    chatroom: chatroomReducer,
    theme: themeReducer,
  },
});

export default store;
