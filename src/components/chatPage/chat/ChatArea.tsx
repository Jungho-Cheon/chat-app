import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentChatroom,
  requestNextMessagePage,
} from '../../../features/chatroom/chatroomSlice';

// components
import ChatMessage from './ChatMessage';

// styled-components
import {
  ChatPaneContainer,
  ChatPaneWrapper,
  ChatPaneNewMessageContainer,
} from '../../../styles/chatStyles/chatArea-styles';
import { nanoid } from '@reduxjs/toolkit';
import { getUserData } from '../../../features/auth/authSlice';

const ChatArea = (): JSX.Element => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const currentChatroom = useSelector(getCurrentChatroom);
  const chatPaneContainer = useRef<HTMLDivElement>(null);
  const [isMessageAdded, setIsMessageAdded] = useState<boolean>(false);
  const [isScrollToBottom, setIsScollToBottom] = useState<boolean>(true);
  const [showNewMessageArrived, setShowNewMessageArrived] = useState<boolean>(
    false
  );
  const [prevHeight, setPrevHeight] = useState<number>(-1);
  const scrollListener = () => {
    if (chatPaneContainer.current) {
      const chatPane = chatPaneContainer.current;
      // 스크롤이 최상단인 경우 추가 메세지 추가 로딩
      if (chatPane.scrollTop === 0) {
        const { chatroomId, currentPage, totalMessages } = currentChatroom;
        if (totalMessages + 20 > currentPage * 20) {
          setIsScollToBottom(false);
          dispatch(
            requestNextMessagePage({
              chatroomId,
              page: currentPage + 1,
            })
          );
          // 스크롤을 고정하기위해 이전 채팅방의 높이를 상태로 기록한다.
          setPrevHeight(chatPane.scrollHeight);
          setIsMessageAdded(true);
        }
      }
      if (
        Math.ceil(
          chatPane.scrollHeight - chatPane.offsetHeight - chatPane.scrollTop
        ) < 500
      ) {
        setIsScollToBottom(true);
      }
    }
  };
  // 메세지 페이징 이벤트 리스너 추가
  useEffect(() => {
    if (chatPaneContainer.current !== null) {
      chatPaneContainer.current.addEventListener('scroll', scrollListener);
    }
    return () =>
      chatPaneContainer.current?.removeEventListener('scroll', scrollListener);
  }, [currentChatroom.currentPage]);

  // 채팅방이 변경된 경우 스크롤을 최하단으로 이동
  useLayoutEffect(() => {
    if (chatPaneContainer.current) {
      setPrevHeight(chatPaneContainer.current.scrollHeight);
      chatPaneContainer.current.scrollTop =
        chatPaneContainer.current.scrollHeight;
    }
  }, [currentChatroom.chatroomId]);

  // 메세지 내용이 변경된 경우 알맞은 스크롤 위치로 이동한다.
  useLayoutEffect(() => {
    const chatPane = chatPaneContainer.current;
    if (chatPane) {
      // 만약 메세지 페이징으로 메세지 배열이 변경된 경우 현재 스크롤 위치를 고정한다.
      if (isMessageAdded) {
        chatPane.scrollTop = chatPane.scrollHeight - prevHeight;
        setIsMessageAdded(false);
      } else {
        // 스크롤이 너무 높게 올라가지 않은 경우 메세지를 입력한 사용자에 관계없이
        // 스크롤을 최하단으로 내린다.
        // 또는, 누군가의 입력으로 변경된 경우 마지막 메세지를 입력한 사용자에 따라 분기한다.
        if (
          currentChatroom.chatMessages[currentChatroom.chatMessages.length - 1]
            .email === userData.email ||
          isScrollToBottom
        ) {
          // 현재 로그인 사용자가 입력한 경우 스크롤을 최하단으로 이동한다.
          chatPane.scrollTop = chatPane.scrollHeight;
          // 최하단으로 이동하므로 모달을 제거한다.
          setShowNewMessageArrived(false);
        }
        // 상대방이 입력한 경우 현재 스크롤 위치를 고정한다.
        // 새로운 메세지가 도착했다는 모달을 띄운다.
        else {
          console.log('open modal!');
          setShowNewMessageArrived(true);
        }
      }
    }
  }, [currentChatroom.chatMessages]);

  const scrollToBottom = (e: React.MouseEvent) => {
    e.preventDefault();
    const chatPane = chatPaneContainer.current;
    if (chatPane) {
      chatPane.scrollTop = chatPane.scrollHeight;
    }
    setShowNewMessageArrived(false);
  };

  const createChatMessage = () => {
    const { chatMessages } = currentChatroom;
    return chatMessages.map(chatMessage => (
      <ChatMessage chatMessage={chatMessage} key={nanoid()} />
    ));
  };
  return (
    <>
      <ChatPaneContainer ref={chatPaneContainer}>
        <ChatPaneWrapper>{createChatMessage()}</ChatPaneWrapper>
      </ChatPaneContainer>
      {showNewMessageArrived && (
        <ChatPaneNewMessageContainer onClick={scrollToBottom}>
          <i className="fas fa-chevron-down"></i>
          <p>새로운 메세지가 도착하였습니다.</p>
        </ChatPaneNewMessageContainer>
      )}
    </>
  );
};

export default React.memo(ChatArea);
