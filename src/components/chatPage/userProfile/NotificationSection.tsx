import React, { useEffect, useLayoutEffect } from 'react';

// Redux
import { nanoid } from '@reduxjs/toolkit';
import {
  FriendRequest,
  getCurrentFriendRequest,
  getFriendRequest,
} from '../../../features/friendRequest/friendRequestSlice';

// components
import MenuButton from '../menuButton/MenuButton';
import FriendRequestCard from './FriendRequestCard';
import { NotificationSectionContainer } from '../../../styles/chatStyles/userProfile-styles/notificationSection-styles';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../../features/auth/authSlice';

export interface NotificationSectionProps {
  userProfile: HTMLDivElement | null;
}

const createSWNotification = async (
  nickname: string,
  avatarUrl: string,
  isResponse: boolean
): Promise<void> => {
  const options: NotificationOptions = {
    body: `${nickname}님이 ${
      isResponse ? '친구 요청에 응답했습니다.' : '친구 요청을 보냈습니다.'
    }`,
    badge: 'assets/logo.png',
    icon: avatarUrl,
    image: 'assets/logo.png',
    dir: 'auto',
  };
  new Notification('Talki - 새로운 친구 요청이 도착했습니다. 👀', options);
};

const NotificationSection = ({
  userProfile,
}: NotificationSectionProps): JSX.Element => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const friendRequests = useSelector(getCurrentFriendRequest);
  const slideToUserProfile = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!userProfile) return;
    userProfile.style.transform = `translateX(-300px)`;
  };
  const createNotification = (
    friendRequests: FriendRequest[]
  ): JSX.Element[] => {
    if (friendRequests.length === 0) return [];
    return [...friendRequests].reverse().map(friendRequest => {
      return <FriendRequestCard key={nanoid()} {...friendRequest} />;
    });
  };

  useLayoutEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
    if (userData.email) dispatch(getFriendRequest(userData.email));
  }, [userData]);
  useEffect(() => {
    if (friendRequests.length === 0) return;

    const lastFriendRequest = friendRequests[friendRequests.length - 1];
    if (!lastFriendRequest?.isChecked) {
      createSWNotification(
        lastFriendRequest.nickname,
        lastFriendRequest.avatarUrl,
        lastFriendRequest.isResponse || false
      );
    }
  }, [friendRequests]);
  return (
    <NotificationSectionContainer>
      <div className="user-profile__notification__header">
        <MenuButton iconClass="fa-chevron-left" onClick={slideToUserProfile} />
        <h3>Notification</h3>
      </div>

      <div className="user-profile__notification-container">
        <div className="user-profile__notification-card-wrapper">
          {friendRequests.length > 0 ? (
            createNotification(friendRequests)
          ) : (
            <span>요청이 없습니다.</span>
          )}
        </div>
      </div>
    </NotificationSectionContainer>
  );
};

export default NotificationSection;
