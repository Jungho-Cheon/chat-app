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
  ChatSendButton,
} from '../../../styles/chatStyles/chatInput-styles';

// redux
import {
  isEmojiOpenedSelector,
  toggleEmojiContainer,
} from '../../../features/emoji/emojiSlice';
import { getUserData } from '../../../features/auth/authSlice';
import {
  getCurrentChatroomId,
  sendComplete,
  sendMessage,
} from '../../../features/chatroom/chatroomSlice';
import { nanoid } from '@reduxjs/toolkit';
import { io, Socket } from 'socket.io-client';

// Socket
const SERVER_URL = process.env.REACT_APP_SERVER_URL || '';
const socket: Socket = io(SERVER_URL);
const ChatInput = (): JSX.Element => {
  const dispatch = useDispatch();
  const { email } = useSelector(getUserData);
  const currentChatroomId = useSelector(getCurrentChatroomId);
  const isEmojiOpened = useSelector(isEmojiOpenedSelector);
  const [text, setText] = useState<string>('');

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
  };
  const handleEnterKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === 'Enter') {
      sendMessageHandler();
    }
  };
  const sendMessageHandler = () => {
    if (text.trim() !== '') {
      if (currentChatroomId && socket.connected) {
        const messageId = nanoid();
        dispatch(
          sendMessage({
            chatroomId: currentChatroomId,
            email,
            message: {
              message: text,
              messageId,
              messageType: 'TEXT',
              isComplete: false,
            },
          })
        );
        socket.emit(
          'SEND_MESSAGE',
          JSON.stringify({
            chatroomId: currentChatroomId,
            email,
            message: {
              message: text,
              messageId,
              messageType: 'TEXT',
            },
          })
        );
      }
      setText('');
    }
  };

  useEffect((): (() => void) => {
    if (email) {
      socket.connect();
      socket.on('SEND_COMPLETE', async data => {
        const sendCompleteProps = JSON.parse(data);
        console.log(sendCompleteProps);
        dispatch(sendComplete(sendCompleteProps));
      });
    }
    return () => socket?.close();
  }, []);
  return (
    <ChatInputContainer>
      <UploadFileButton>
        <i className="fas fa-paperclip"></i>
      </UploadFileButton>
      <ChatTextInput
        placeholder="Write your message"
        ref={textInput}
        type="text"
        value={text}
        onChange={textChange}
        onKeyPress={handleEnterKeyPress}
      />
      <EmojiButton onClick={() => dispatch(toggleEmojiContainer())}>
        <i className="far fa-smile"></i>
      </EmojiButton>
      {isEmojiOpened && (
        <EmojiPickerWrapper onClick={() => dispatch(toggleEmojiContainer())}>
          <EmojiPicker onEmojiClick={emojiClick} />
        </EmojiPickerWrapper>
      )}
      <ChatSendButton onClick={sendMessageHandler}>
        <i className="fas fa-paper-plane"></i>
      </ChatSendButton>
    </ChatInputContainer>
  );
};

export default ChatInput;
