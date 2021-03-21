import { io } from 'socket.io-client';

export const socket = io(process.env.REACT_APP_SERVER_URL || '', {
  timeout: 5000,
  reconnectionAttempts: 1,
});
