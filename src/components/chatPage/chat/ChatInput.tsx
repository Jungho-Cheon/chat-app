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
  getCurrentChatroomId,
  receiveMessage,
  sendComplete,
  sendMessage,
} from '../../../features/chatroom/chatroomSlice';
import { nanoid } from '@reduxjs/toolkit';
import {
  CompleteMessageProps,
  SendMessageProps,
} from '../../../features/chatroom/chatroomTypes';

import { socket } from '../../../service/socket';

const ChatInput = (): JSX.Element => {
  const dispatch = useDispatch();
  const { email, chatroomIds } = useSelector(getUserData);
  const currentChatroomId = useSelector(getCurrentChatroomId);
  const [isEmojiOpened, setIsEmojiOpened] = useState(false);
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
              readUsers: new Array<string>(email),
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
