import { combineReducers, configureStore } from '@reduxjs/toolkit';
import chatroomReducer from '../features/chatroom/chatroomSlice';
import authReducer from '../features/auth/authSlice';

import themeReducer from '../features/theme/themeSlice';

const store = configureStore({
  reducer: combineReducers({
    chatroom: chatroomReducer,
    auth: authReducer,
    theme: themeReducer,
  }),
});

export type Dispatch = typeof store.dispatch;

export default store;
