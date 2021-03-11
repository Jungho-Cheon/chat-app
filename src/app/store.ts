import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import chatroomReducer from '../features/chatroom/chatRoomSlice';

const store = configureStore({
  reducer: {
    chatroom: chatroomReducer,
  },
});


export type Dispatch = typeof store.dispatch;

export default store;