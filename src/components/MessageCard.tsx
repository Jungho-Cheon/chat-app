import React from 'react';

import { UserData } from './messageCardTypes';

// styled component
import {
  MessageCardContainer,
  MessageCardAvatar,
  MessagePreviewContainer,
  MessageUser,
  MessagePreview,
  MessageInfoContainer,
  TimeAgo,
  UnreadCount,
} from '../styles/messageCard-styles';

const MessageCard: React.FunctionComponent<UserData> = ({
  username,
  profileImage,
  previewMessage,
  timeago,
  unreadCount,
}: UserData): JSX.Element => {
  return (
    <MessageCardContainer>
      <MessageCardAvatar>
        <img src={profileImage} alt={username} />
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
