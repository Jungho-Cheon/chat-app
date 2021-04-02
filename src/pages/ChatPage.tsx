import React, { useCallback, useEffect } from 'react';

// components
// import Navbar from '../components/chatPage/navbar/Navbar';
import MessageList from '../components/chatPage/messageList/MessageList';
import ChatMain from '../components/chatPage/chat/ChatMain';
import ChatSideBar from '../components/chatPage/sidebar/ChatSideBar';

// styled-components
import { ChatPageContainer } from '../styles/chatStyles/chatPage-styles';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../features/auth/authSlice';
import { useHistory } from 'react-router';

// socket
import socket from '../socket/socket';
import { fetchChatroomInfo } from '../features/chatroom/chatroomSlice';

const ChatPage = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userData = useSelector(getUserData);
  const { email, chatroomIds } = useSelector(getUserData);
  const dispatchAllChatrooms = useCallback(() => {
    const chatroomSet = new Set(userData.chatroomIds);
    chatroomSet.forEach((chatroomId: string) => {
      dispatch(fetchChatroomInfo(chatroomId));
    });
  }, [userData]);
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
      dispatchAllChatrooms();
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
      <MessageList />
      <ChatMain />
      <ChatSideBar />
    </ChatPageContainer>
  );
};

export default ChatPage;
