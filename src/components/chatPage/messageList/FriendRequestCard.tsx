import React from 'react';
import { useDispatch } from 'react-redux';

// types
import {
  FriendRequest,
  responseFriendRequest,
} from '../../../features/friendRequest/friendRequestSlice';

// styled-components
import { FriendRequestCardContainer } from '../../../styles/chatStyles/MessageList-styles/friendRequestCard-styles';

// user client
import UserAvatar from '../avatar/UserAvatar';

const FriendRequestCard = ({
  email,
  nickname,
  status,
  avatarUrl,
  isResponse,
}: FriendRequest): JSX.Element => {
  const dispatch = useDispatch();
  const FriendRequestHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    accept: boolean
  ) => {
    e.preventDefault();
    console.log('dispatch responseFriendRequest');
    dispatch(responseFriendRequest({ sendEmail: email, accept }));
  };
  const createButton = (status: string) => {
    switch (status) {
      case 'ACCEPT':
        return (
          <div className="friend-request-card__button accept complete">
            수락됨
          </div>
        );
      case 'REJECT':
        return (
          <div className="friend-request-card__button reject complete">
            거절됨
          </div>
        );
      case 'PENDING':
      default:
        return (
          <>
            <div
              className="friend-request-card__button accept"
              onClick={e => FriendRequestHandler(e, true)}
            >
              수락
            </div>
            <div
              className="friend-request-card__button reject"
              onClick={e => FriendRequestHandler(e, false)}
            >
              거절
            </div>
          </>
        );
    }
  };
  return (
    <FriendRequestCardContainer>
      <UserAvatar avatarUrl={avatarUrl} width="40px" />
      <div className="friend-request-card__info">
        <span>
          {nickname} 님이 친구 요청을{' '}
          {isResponse ? '수락했습니다. 🥳' : '보냈습니다.'}
        </span>
      </div>
      <div className="friend-request-card__button-container">
        {!isResponse && createButton(status)}
      </div>
    </FriendRequestCardContainer>
  );
};

export default FriendRequestCard;
