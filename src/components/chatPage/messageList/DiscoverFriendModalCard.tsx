import React from 'react';

// styled-components
import {
  DiscoverFriendModalCardContainer,
  FriendRequestButton,
} from '../../../styles/chatStyles/MessageList-styles/discoverFriendModalCard-styles';
import UserAvatar from '../avatar/UserAvatar';

interface DiscoverFriendModalCardProps {
  email: string;
  nickname: string;
  avatarUrl: string;
  status: string;
}

const DiscoverFriendModalCard = ({
  email,
  nickname,
  avatarUrl,
  status,
}: DiscoverFriendModalCardProps): JSX.Element => {
  const createSendButton = (status: string): JSX.Element => {
    switch (status) {
      case 'IDLE':
      case 'REJECT':
        return (
          <FriendRequestButton status={status}>친구 요청</FriendRequestButton>
        );
      case 'PENDING':
        return (
          <FriendRequestButton status={status}>요청 취소</FriendRequestButton>
        );
      default:
        throw new Error(`status error: ${status}`);
    }
  };
  return (
    <DiscoverFriendModalCardContainer>
      <UserAvatar avatarUrl={avatarUrl} width="50px" />
      <h3>{nickname}</h3>
      <span>{email}</span>
      {createSendButton(status)}
    </DiscoverFriendModalCardContainer>
  );
};

export default DiscoverFriendModalCard;
