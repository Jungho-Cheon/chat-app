import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  getCurrentChatroom,
  requestNextMessagePage,
  sendMessage,
} from '../../../features/chatroom/chatroomSlice';

// components
import ChatMessage from './ChatMessage';

// styled-components
import {
  ChatPaneContainer,
  ChatPaneWrapper,
  ChatMessageContainer,
  ChatPaneNewMessageContainer,
  ChatPaneAddFileModelContainer,
} from '../../../styles/chatStyles/chatArea-styles';
import { nanoid } from '@reduxjs/toolkit';
import { getUserData } from '../../../features/auth/authSlice';

// util
import { compareDate } from './ChatMessage';
import { socket } from '../../../features/socket/socketSlice';

import Client from '../../../client/chatClient';

const client = new Client(process.env.REACT_APP_SERVER_URL || '');

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
  const [showAddFileModal, setShowAddFileModal] = useState<boolean>(false);
  const scrollListener = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    e.preventDefault();
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
  const dragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setShowAddFileModal(true);
    console.log('dragEnter!');
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setShowAddFileModal(false);
    console.log('dragLeave!');
  };
  const transferFile = (file: File) => {
    console.log(file);
  };
  const handleFile = async (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        const chatroomId = currentChatroom.chatroomId;
        // 파일 업로드
        const response = await client.uploadFile(chatroomId, file);
        // 이미지 파일인 경우
        if (file.type.startsWith('image')) {
          const email = userData.email;
          const messageId = nanoid();
          dispatch(
            sendMessage({
              chatroomId,
              email,
              message: {
                messageId,
                message: response.fileURL,
                messageType: 'IMAGE',
                readUsers: [userData.email],
                isComplete: false,
              },
            })
          );
          socket.emit(
            'SEND_MESSAGE',
            JSON.stringify({
              chatroomId,
              email,
              message: {
                message: response.fileURL,
                messageId,
                messageType: 'IMAGE',
              },
            })
          );
        }
        // 일반 파일인 경우 파일로 전송
        transferFile(file);
      }
    }
  };
  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const dt = e.dataTransfer;
    const file = dt?.files;
    if (file) handleFile(file);

    setShowAddFileModal(false);
  };
  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };
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
        const chatMessages = currentChatroom.chatMessages;
        if (
          (chatMessages.length > 0 &&
            chatMessages[chatMessages.length - 1].email === userData.email) ||
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
    return chatMessages.map((chatMessage, idx) => {
      let isNextDay = false,
        date: Date = new Date();
      if (idx > 0) {
        if (
          chatMessages[idx - 1].messages[chatMessage.messages.length - 1] &&
          chatMessage.messages[0]
        ) {
          const prev =
            chatMessages[idx - 1].messages[chatMessage.messages.length - 1]
              .insertDate || '';
          const cur = chatMessage.messages[0].insertDate || '';
          const cmp = compareDate(prev, cur);
          isNextDay = cmp.isNextDay;
          date = cmp.date;
        }
      }
      return (
        <ChatMessageContainer key={nanoid()}>
          {isNextDay && (
            <div className="message__dateDivider">
              <div className="message__dateDivider__line" />
              <div className="message__dateDivider__date">
                {date.getMonth() + 1 + '월 ' + date.getDate() + '일'}
              </div>
            </div>
          )}
          <ChatMessage chatMessage={chatMessage} />
        </ChatMessageContainer>
      );
    });
  };
  return (
    <>
      <ChatPaneContainer
        ref={chatPaneContainer}
        onScroll={scrollListener}
        onDrop={dropHandler}
        onDragOver={dragOverHandler}
        onDragEnter={dragEnterHandler}
        onDragLeave={dragLeaveHandler}
      >
        <ChatPaneWrapper>{createChatMessage()}</ChatPaneWrapper>
      </ChatPaneContainer>
      {showNewMessageArrived && (
        <ChatPaneNewMessageContainer onClick={scrollToBottom}>
          <i className="fas fa-chevron-down"></i>
          <p>새로운 메세지가 도착하였습니다.</p>
        </ChatPaneNewMessageContainer>
      )}
      {showAddFileModal && (
        <ChatPaneAddFileModelContainer>
          <img
            className="ChatPane__AddFile"
            src="assets/add-photo-icon.svg"
            alt="add-photo"
          />
        </ChatPaneAddFileModelContainer>
      )}
    </>
  );
};

export default React.memo(ChatArea);
