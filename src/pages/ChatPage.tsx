import React, { useEffect } from 'react';

// components
import Navbar from '../components/chatPage/navbar/Navbar';
import MessageList from '../components/chatPage/messageList/MessageList';
import ChatMain from '../components/chatPage/chat/ChatMain';

// styled-components
import { ChatPageContainer } from '../styles/chatStyles/chatPage-styles';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../features/auth/authSlice';
import {
  CheckReadMessageProps,
  CompleteMessageProps,
  SendMessageProps,
} from '../features/chatroom/chatroomTypes';
import {
  receiveMessage,
  sendComplete,
  checkReadMessage,
  getCurrentChatroomId,
  initSocketId,
} from '../features/chatroom/chatroomSlice';
import { useHistory } from 'react-router';

// socket 
import {socket} from '../features/socket/socketSlice'

const ChatPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { email, chatroomIds } = useSelector(getUserData);

  useEffect((): (() => void) => {
    if (email) {
      chatroomIds.forEach(chatroomId => {
        socket.emit(
          'JOIN_ROOM',
          JSON.stringify({
            email,
            chatroomId,
          })
        );
      });
    } else {
      history.push('/sign-in');
    }
    return () => {
      socket.off('RECEIVE_MESSAGE');
      socket.off('SEND_COMPLETE');
    };
  }, []);
  return (
    <ChatPageContainer>
      <Navbar />
      <MessageList />
      <ChatMain />
    </ChatPageContainer>
  );
};

export default ChatPage;
