import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// emoji
import EmojiPicker, { IEmojiData } from 'emoji-picker-react';

// styled components
import {
  ChatInputContainer,
  UploadFileButton,
  ChatTextInput,
  EmojiButton,
  EmojiPickerWrapper,
  EmojiPickerContainer,
  ChatSendButton,
} from '../../../styles/chatStyles/chatInput-styles';

// redux
import { getUserData } from '../../../features/auth/authSlice';
import {
  getCurrentChatroom,
  getCurrentChatroomId,
  sendMessage,
} from '../../../features/chatroom/chatroomSlice';

// socket
import { socket } from '../../../socket/socket';
import { nanoid } from '@reduxjs/toolkit';
import { urlRegex } from '../../../utils/urlRegex';

import Client from '../../../client/chatClient';
import { UrlData } from '../../../features/chatroom/chatroomTypes';

const client = new Client(process.env.REACT_APP_SERVER_URL || '');

const ChatInput = (): JSX.Element => {
  const dispatch = useDispatch();
  const fileInput = useRef<HTMLInputElement>(null);
  const { email, friendData } = useSelector(getUserData);
  const currentChatroom = useSelector(getCurrentChatroom);
  const currentChatroomId = useSelector(getCurrentChatroomId);
  const [isEmojiOpened, setIsEmojiOpened] = useState(false);
  const [text, setText] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const textInput = useRef<HTMLInputElement>(null);

  const emojiClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    emojiObject: IEmojiData
  ): void => {
    event.preventDefault();
    setText(text => text + emojiObject.emoji);
  };
  const textChange: React.ChangeEventHandler<HTMLInputElement> = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setText(event.target.value);
    if (currentChatroomId && socket.connected) {
      if (!isTyping) {
        socket.emit(
          'CHAT_TYPING',
          JSON.stringify({
            chatroomId: currentChatroomId,
            email,
          })
        );
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }
      if (event.target.value === '') {
        setIsTyping(false);
        socket.emit(
          'CHAT_TYPING',
          JSON.stringify({
            chatroomId: currentChatroomId,
            email: '',
          })
        );
      }
    }
  };
  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      sendMessageHandler();
    }
  };

  const checkMessageType = (text: string) => {
    try {
      new URL(text);
    } catch (err) {
      return 'TEXT';
    }
    return 'URL';
  };

  const sendMessageHandler = async () => {
    if (text.trim() !== '' && currentChatroomId && socket.connected) {
      const messageType = checkMessageType(text);
      const messageId = nanoid(); // 임시 메세지 아이디
      const payload: {
        chatroomId: string;
        email: string;
        message: {
          message: string;
          messageId: string;
          messageType: string;
          urlData?: UrlData;
        };
      } = {
        chatroomId: currentChatroomId,
        email,
        message: {
          message: text,
          messageId,
          messageType,
        },
      };
      const statePayload = {
        ...payload,
        message: {
          ...payload.message,
          readUsers: [email],
          isComplete: false,
        },
      };
      if (messageType === 'URL') {
        const urlData = await client.getLinkPreview(text);
        if (urlData.hasOwnProperty('message')) {
          payload.message.messageType = 'TEXT';
          statePayload.message.messageType = 'TEXT';
        } else {
          payload.message.urlData = urlData;
          statePayload.message.urlData = urlData;
        }
      }
      // 현재 메세지를 상태에 추가
      dispatch(sendMessage(statePayload));
      // 현재 채팅방의 사용자에게 브로드케스팅을 위한 소켓 통신
      socket.emit('SEND_MESSAGE', JSON.stringify(payload));
      socket.emit(
        'CHAT_TYPING',
        JSON.stringify({
          chatroomId: currentChatroomId,
          email: '',
        })
      );
      setText('');
    }
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
                readUsers: [email],
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
                readUsers: [email],
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
  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const files = e.target.files;
    if (files) handleFile(files);
  };
  useEffect(() => {
    if (currentChatroom.chatingUser)
      setNickname(friendData[currentChatroom.chatingUser].nickname);
    else setNickname('');
  }, [currentChatroom.chatingUser]);

  return (
    <ChatInputContainer>
      {currentChatroom.chatingUser && nickname && (
        <div className="ChatInput__Typing">
          <div className="wave">
            <div className="dot"></div>
            <div className="dot"></div>
            <div className="dot"></div>
          </div>

          <p>
            <span>{nickname}님이 입력중입니다.</span>
          </p>
        </div>
      )}
      <UploadFileButton onClick={() => fileInput.current?.click()}>
        <i className="fas fa-paperclip"></i>
        <input
          ref={fileInput}
          className="fileSelector"
          type="file"
          style={{ display: `none` }}
          onChange={inputHandler}
        />
      </UploadFileButton>
      <ChatTextInput
        placeholder="Write your message"
        ref={textInput}
        type="text"
        value={text}
        onChange={textChange}
        onKeyPress={handleEnterKeyPress}
      />
      <EmojiButton onClick={() => setIsEmojiOpened(!isEmojiOpened)}>
        <i className="far fa-smile"></i>
      </EmojiButton>
      <EmojiPickerWrapper
        style={{ display: isEmojiOpened ? `block` : `none` }}
        onClick={event => {
          event.preventDefault();
          console.log(event.target, event.currentTarget);
          setIsEmojiOpened(!isEmojiOpened);
        }}
      >
        <EmojiPickerContainer onClick={e => e.stopPropagation()}>
          <EmojiPicker onEmojiClick={emojiClick} />
        </EmojiPickerContainer>
      </EmojiPickerWrapper>

      <ChatSendButton onClick={sendMessageHandler}>
        <i className="fas fa-paper-plane"></i>
      </ChatSendButton>
    </ChatInputContainer>
  );
};

export default ChatInput;
