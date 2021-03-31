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
  ChatMessageContainer,
  ChatPaneNewMessageContainer,
  ChatPaneAddFileModelContainer,
  ChatPaneClickedIamge,
} from '../../../styles/chatStyles/chatArea-styles';
import { nanoid } from '@reduxjs/toolkit';
import { getUserData } from '../../../features/auth/authSlice';

// util
import { compareDate } from './ChatMessage';
import socket from '../../../socket/socket';

import Client from '../../../client/chatClient';

const client = new Client(process.env.REACT_APP_SERVER_URL || '');

const ChatArea = (): JSX.Element => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const currentChatroom = useSelector(getCurrentChatroom);
  const chatPaneContainer = useRef<HTMLDivElement>(null);
  const [isInit, setIsInit] = useState<boolean>(true);
  // const [isImageClicked, setIsImageClicked] = useState<boolean>(false);
  const [isMessageAdded, setIsMessageAdded] = useState<boolean>(false);
  // const [isScrollToBottom, setIsScrollToBottom] = useState<boolean>(true);
  const [showNewMessageArrived, setShowNewMessageArrived] = useState<boolean>(
    false
  );
  const [prevHeight, setPrevHeight] = useState<number>(-1);
  const [showAddFileModal, setShowAddFileModal] = useState<boolean>(false);
  const [clickedImage, setClickedImage] = useState<string>('');

  // 이미지, 파일 드래그 앤 드랍 관련 핸들러
  let dragCounter = 0;
  const dragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setShowAddFileModal(true);
    dragCounter += 1;
  };
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    dragCounter -= 1;
    if (dragCounter === 0) setShowAddFileModal(false);
  };
  const handleFile = async (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        if (file.size > 5 * 2 ** 20) {
          alert('5MB 이하의 파일만 전송할 수 있습니다.. 😵');
          return;
        }
        // 파일 업로드
        const chatroomId = currentChatroom.chatroomId;
        const response = await client.uploadFile(chatroomId, file);
        const email = userData.email;
        const messageId = nanoid();
        // 이미지 파일인 경우
        if (file.type.startsWith('image')) {
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
        } else {
          // 일반 파일인 경우 파일로 전송
          dispatch(
            sendMessage({
              chatroomId,
              email,
              message: {
                messageId,
                message: file.name,
                fileURL: response.fileURL,
                messageType: 'FILE',
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
                messageType: 'FILE',
              },
            })
          );
        }
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

  // 채팅창 스크롤 관련 핸들러
  const scrollListener = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    e.preventDefault();
    const chatPane = chatPaneContainer.current;
    if (chatPane) {
      // 스크롤이 최상단인 경우 추가 메세지 추가 로딩
      if (chatPane.scrollTop === 0) {
        const { chatroomId, currentPage, totalMessages } = currentChatroom;
        if (totalMessages + 20 > currentPage * 20) {
          // 스크롤을 고정하기위해 이전 채팅방의 높이를 상태로 기록한다.
          setPrevHeight(chatPane.scrollHeight);
          setIsMessageAdded(true);
          setIsInit(false);

          dispatch(
            requestNextMessagePage({
              chatroomId,
              page: currentPage + 1,
            })
          );
        }
      }
    }
  };

  const scrollToBottom = (e: any) => {
    e.preventDefault();
    const chatPane = chatPaneContainer.current;
    if (chatPane && isInit) {
      chatPane.scrollTop = chatPane.scrollHeight;
      setShowNewMessageArrived(false);
    }
  };
  const scrollToPrevHeight = () => {
    const chatPane = chatPaneContainer.current;
    if (
      chatPane &&
      Math.ceil(
        chatPane.scrollHeight - chatPane.offsetHeight - chatPane.scrollTop
      ) >= 100 &&
      !showNewMessageArrived
    ) {
      chatPane.scrollTop = chatPane.scrollHeight - prevHeight;
    }
  };
  // 채팅방이 변경된 경우 스크롤을 최하단으로 이동
  useEffect(() => {
    if (chatPaneContainer.current) {
      setPrevHeight(chatPaneContainer.current.scrollHeight);
      chatPaneContainer.current.scrollTop =
        chatPaneContainer.current.scrollHeight;
      console.log(chatPaneContainer.current.scrollTop);
    }
    setTimeout(() => setIsInit(false), 3000);
  }, [currentChatroom.chatroomId]);

  // 메세지 내용이 변경된 경우 알맞은 스크롤 위치로 이동한다.
  useLayoutEffect(() => {
    if (isInit) return;
    console.log('useLayoutEffect triggered');
    const chatPane = chatPaneContainer.current;
    if (chatPane) {
      // 만약 메세지 페이징으로 메세지 배열이 변경된 경우 현재 스크롤 위치를 고정한다.
      console.log(
        `현재 채팅창 높이 ${chatPane.scrollHeight}, 스크롤 위치 ${chatPane.scrollTop}`
      );
      if (isMessageAdded) {
        console.log(
          '메세지 내용이 변경되었으나 스크롤 최상단으로 인함.',
          chatPane.scrollHeight,
          prevHeight
        );
        chatPane.scrollTop = chatPane.scrollHeight - prevHeight;
        setIsMessageAdded(false);
        console.log('메세지 추가 플레그 초기화', chatPane.scrollTop);
      } else {
        // 스크롤이 너무 높게 올라가지 않은 경우 메세지를 입력한 사용자에 관계없이
        // 스크롤을 최하단으로 내린다.
        // 또는, 누군가의 입력으로 변경된 경우 마지막 메세지를 입력한 사용자에 따라 분기한다.
        const chatMessages = currentChatroom.chatMessages;
        if (
          (chatMessages.length > 0 &&
            chatMessages[chatMessages.length - 1].email === userData.email) ||
          chatPane.scrollHeight <
            chatPane.scrollTop + chatPane.offsetHeight + 300
        ) {
          console.log(
            chatMessages[chatMessages.length - 1].email,
            userData.email
          );
          console.log(
            chatPane.scrollHeight,
            chatPane.scrollTop + chatPane.offsetHeight
          );
          // 현재 로그인 사용자가 입력한 경우 스크롤을 최하단으로 이동한다.
          chatPane.scrollTop = chatPane.scrollHeight;
          // 최하단으로 이동하므로 모달을 제거한다.
          setShowNewMessageArrived(false);
        }
        // 상대방이 입력한 경우 현재 스크롤 위치를 고정한다.
        // 새로운 메세지가 도착했다는 모달을 띄운다.
        else {
          console.log('상대방의 메세지 도착.');
          setShowNewMessageArrived(true);
        }
      }
    }
  }, [currentChatroom.chatMessages]);

  const createChatMessage = () => {
    const chatMessages = currentChatroom.chatMessages;
    if (chatMessages.length === 0)
      return (
        <div className="chatmessage__start">
          <h1>채팅이 시작되었습니다. 대화를 시작해보세요!</h1>
        </div>
      );
    return chatMessages.map((chatMessage, idx) => {
      let isNextDay = false,
        date: Date = new Date();
      if (idx > 0) {
        const prevChatMessages = chatMessages[idx - 1].messages;
        if (
          prevChatMessages[prevChatMessages.length - 1] &&
          chatMessage.messages[0]
        ) {
          const prev =
            prevChatMessages[prevChatMessages.length - 1].insertDate || '';
          const cur = chatMessage.messages[0].insertDate || '';
          const cmp = compareDate(prev, cur);
          isNextDay = cmp.isNextDay;
          date = cmp.date;
        }
      } else {
        isNextDay = true;
        const insertDate = chatMessage.messages[0].insertDate || '';
        date = new Date(Date.parse(insertDate) - 9 * 1000 * 60 * 60);
      }
      return (
        <ChatMessageContainer key={nanoid()} isNextDay={isNextDay}>
          {isNextDay && (
            <div className="message__dateDivider">
              <div className="message__dateDivider__line" />
              <div className="message__dateDivider__date">
                {date.getMonth() + 1 + '월 ' + date.getDate() + '일'}
              </div>
            </div>
          )}
          {/* 이미지 로딩 이후 이미지 높이에 따라 변하는 스크롤을 내리기 위해
           콜백함수(scrollToBottom, scrollToPrevHeight)를 전달함. */}
          <ChatMessage
            chatMessage={chatMessage}
            scrollToBottom={scrollToBottom}
            scrollToPrevHeight={scrollToPrevHeight}
            setPrevHeight={setPrevHeight}
            chatPaneContainer={chatPaneContainer}
            setClickedImage={setClickedImage}
          />
        </ChatMessageContainer>
      );
    });
  };
  console.log(
    `ChatArea Rerender.. showNewMessageArrived ${showNewMessageArrived}`
  );
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
        <div className="wrapper">{createChatMessage()}</div>
      </ChatPaneContainer>
      {showNewMessageArrived && (
        <ChatPaneNewMessageContainer
          onClick={e => {
            e.preventDefault();
            const chatPane = chatPaneContainer.current;
            if (chatPane) {
              chatPane.scrollTop = chatPane.scrollHeight;
              setShowNewMessageArrived(false);
            }
          }}
        >
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
      {clickedImage && (
        <ChatPaneClickedIamge
          src={clickedImage}
          alt="clicked-image"
          onClick={e => {
            e.preventDefault();
            setClickedImage('');
          }}
        />
      )}
    </>
  );
};

export default React.memo(ChatArea);
