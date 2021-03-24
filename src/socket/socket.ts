import { io } from 'socket.io-client';
import { userOffline, userOnline } from '../features/auth/authSlice';
import {
  checkReadMessage,
  initSocketId,
  toggleChatTyping,
  receiveMessage,
  sendComplete,
} from '../features/chatroom/chatroomSlice';
import {
  CheckReadMessageProps,
  CompleteMessageProps,
  SendMessageProps,
} from '../features/chatroom/chatroomTypes';

import store from '../app/store';

export const socket = io('http://localhost:8080', {
  timeout: 5000,
  reconnectionAttempts: 5,
  autoConnect: false,
  transports: ['websocket'],
});

// Async Thunk
export const connectSocket = async (email: string): Promise<void> => {
  console.log('try connect socket - ', email);
  socket.io.opts.query = {
    email,
    accessToken: store.getState().auth.accessToken,
  };
  socket.connect();
};

socket.on('connect', () => {
  console.log(`socket connected - ${socket.id}`);
  store.dispatch(initSocketId(socket.id));
});
socket.on('CHAT_TYPING', async data => {
  const { chatroomId, email } = JSON.parse(data);
  store.dispatch(toggleChatTyping({ chatroomId, email }));
});
socket.on('SEND_COMPLETE', async data => {
  const sendCompleteProps: CompleteMessageProps = JSON.parse(data);
  store.dispatch(sendComplete(sendCompleteProps));
});
socket.on('RECEIVE_MESSAGE', async data => {
  const receivedMessage: SendMessageProps = JSON.parse(data);
  const email = store.getState().auth.userData.email;
  store.dispatch(receiveMessage({ ...receivedMessage, userEmail: email }));
});
socket.on('READ_MESSAGE', async data => {
  const checkReadMessageProps: CheckReadMessageProps = JSON.parse(data);
  store.dispatch(checkReadMessage(checkReadMessageProps));
});
socket.on('USER_ONLINE', async data => {
  const { email } = JSON.parse(data);

  store.dispatch(userOnline(email));
});
socket.on('USER_OFFLINE', async data => {
  const { email } = JSON.parse(data);
  store.dispatch(userOffline(email));
});
