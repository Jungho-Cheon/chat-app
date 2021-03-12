import React from 'react';

import { ChatRoom } from './messageCardTypes';

// components
import UserAvatar from '../avatar/UserAvatar';

// styled component
import {
  MessageCardContainer,
  MessagePreviewContainer,
  MessageUser,
  MessagePreview,
  MessageInfoContainer,
  TimeAgo,
  UnreadCount,
  MessageCardAvatar,
} from '../../styles/messageCard-styles';

// redux
import { useDispatch, useSelector } from 'react-redux';
import {
  chatdataSelector,
  fetchChatData,
  changeChatRoom,
} from '../../features/chatData/chatDataSlice';

const MessageCard: React.FunctionComponent<ChatRoom> = ({
  chatroomId,
  chatroomName,
  chatroomAvatar,
  previewMessage,
  timeago,
  unreadCount,
}: ChatRoom): JSX.Element => {
  const dispatch = useDispatch();
  const chatdata = useSelector(chatdataSelector);
  const selectChatRoom = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!chatdata.data[chatroomId]) {
      dispatch(fetchChatData(chatroomId));
    } else {
      dispatch(changeChatRoom(chatroomId));
    }
  };
  return (
    <MessageCardContainer unread={!!unreadCount} onClick={selectChatRoom}>
      <MessageCardAvatar>
        <UserAvatar avatarUrl={chatroomAvatar} width="50px" />
      </MessageCardAvatar>
      <MessagePreviewContainer>
        <MessageUser> {chatroomName} </MessageUser>
        <MessagePreview>
          {' '}
          {previewMessage?.substring(0, 40) + '...'}
        </MessagePreview>
      </MessagePreviewContainer>
      <MessageInfoContainer>
        <TimeAgo>{timeago}</TimeAgo>
        {unreadCount && (
          <UnreadCount>
            <p>{unreadCount.toString()}</p>
          </UnreadCount>
        )}
      </MessageInfoContainer>
    </MessageCardContainer>
  );
};

export default MessageCard;
