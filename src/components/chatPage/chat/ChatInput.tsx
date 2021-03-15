import React, { useRef, useState } from 'react';

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
  addMessage,
  chatdataSelector,
  sendMessage,
} from '../../../features/chatData/chatDataSlice';
import {
  isEmojiOpenedSelector,
  toggleEmojiContainer,
} from '../../../features/emoji/emojiSlice';
import { userDataSelector } from '../../../features/login/loginSlice';

const ChatInput = (): JSX.Element => {
  const dispatch = useDispatch();
  const { userId } = useSelector(userDataSelector);
  const { currentChatRoomId } = useSelector(chatdataSelector);
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
      if (typeof currentChatRoomId === 'string') {
        dispatch(
          addMessage({ chatroomId: currentChatRoomId, userId, message: text })
        );
        dispatch(
          sendMessage({ chatroomId: currentChatRoomId, userId, message: text })
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
