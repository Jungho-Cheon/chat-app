import React from 'react';

import { UserData } from './messageCardTypes';

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
import UserAvatar from '../avatar/UserAvatar';

const MessageCard: React.FunctionComponent<UserData> = ({
  username,
  profileImage,
  previewMessage,
  timeago,
  unreadCount,
}: UserData): JSX.Element => {
  return (
    <MessageCardContainer unread={!!unreadCount}>
      <MessageCardAvatar>
        <UserAvatar avatarUrl={profileImage} width="50px" />
      </MessageCardAvatar>
      <MessagePreviewContainer>
        <MessageUser> {username} </MessageUser>
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
