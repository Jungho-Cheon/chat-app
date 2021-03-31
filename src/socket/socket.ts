import { io } from 'socket.io-client';
import { userOffline, userOnline, addFriend } from '../features/auth/authSlice';
import {
  checkReadMessage,
  initSocketId,
  receiveMessage,
  sendComplete,
} from '../features/chatroom/chatroomSlice';
import {
  CheckReadMessageProps,
  CompleteMessageProps,
  SendMessageProps,
} from '../features/chatroom/chatroomTypes';

import store from '../app/store';
import {
  handleRequest,
  addResponseRequest,
} from '../features/friendRequest/friendRequestSlice';
import { FriendData } from '../features/auth/authTypes';

const socket = io('ws://localhost:8080', {
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

// 메세지 전송, 응답 처리
socket.on('SEND_COMPLETE', async data => {
  const sendCompleteProps: CompleteMessageProps = JSON.parse(data);
  console.log(sendCompleteProps);
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

// 친구요청 응답 처리
socket.on('FRIEND_REQUEST', async data => {
  const friendRequest = JSON.parse(data);
  console.log(`FRIEND_REQUEST`, friendRequest);
  store.dispatch(handleRequest(friendRequest));
});
socket.on('RESPONSE_FRIEND_REQUEST', async data => {
  const friendData: FriendData = JSON.parse(data);
  console.log('RESPONSE_FRIEND_REQUEST', friendData);
  store.dispatch(addFriend({ ...friendData }));
  store.dispatch(addResponseRequest({ ...friendData }));
});

// on, off-line 처리
socket.on('USER_ONLINE', async data => {
  const { email } = JSON.parse(data);
  console.log(`${email} online`);
  store.dispatch(userOnline(email));
});
socket.on('USER_OFFLINE', async data => {
  const { email } = JSON.parse(data);
  console.log(`${email} offline`);
  store.dispatch(userOffline(email));
});

export default socket;
