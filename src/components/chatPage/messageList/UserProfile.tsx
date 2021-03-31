import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../../../features/auth/authSlice';
import {
  checkFriendRequests,
  FriendRequest,
  getCurrentFriendRequest,
  getFriendRequest,
} from '../../../features/friendRequest/friendRequestSlice';

// styled-components
import {
  UserProfileContainer,
  UserProfileFriendSection,
  UserNameContainer,
  UserProfileInfo,
  UserProfileNotification,
  UserProfileFriendsButton,
  FriendDetailModalContainer,
} from '../../../styles/chatStyles/MessageList-styles/userProfile-styles';

// component
import UserRectAvatar from '../avatar/UserRectAvatar';
import FriendCard from './FriendCard';

// user info client
import FriendRequestCard from './FriendRequestCard';
import { nanoid } from '@reduxjs/toolkit';
import { FriendData } from '../../../features/auth/authTypes';
import MenuButton from '../menuButton/MenuButton';

const UserProfile = (): JSX.Element => {
  const dispatch = useDispatch();
  const userData = useSelector(getUserData);
  const friendRequest = useSelector(getCurrentFriendRequest);
  const [hasNewNotification, setHasNewNotification] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [
    friendDetailModalData,
    setFriendDetailModalData,
  ] = useState<FriendData>();
  const userProfile = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
    if (userData.email) dispatch(getFriendRequest(userData.email));
  }, [userData]);
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
  useEffect(() => {
    if (friendRequest.length > 0) {
      const lastFriendRequest = friendRequest[friendRequest.length - 1];
      if (!lastFriendRequest?.isChecked) {
        createSWNotification(
          lastFriendRequest.nickname,
          lastFriendRequest.avatarUrl,
          lastFriendRequest.isResponse || false
        );
        setHasNewNotification(true);
      }
    }
  }, [friendRequest]);
  const createNotification = (
    friendRequests: FriendRequest[]
  ): JSX.Element[] => {
    if (friendRequests.length === 0) return [];
    return [...friendRequests].reverse().map(friendRequest => {
      return <FriendRequestCard key={nanoid()} {...friendRequest} />;
    });
  };
  const slideNotification = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!userProfile.current) return;
    userProfile.current.style.transform = `translateX(-600px)`;
    setFriendDetailModalData(undefined);
    dispatch(checkFriendRequests());
    setHasNewNotification(false);
    setShowNotification(!showNotification);
  };
  const slideToFriendList = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!userProfile.current) return;

    userProfile.current.style.transform = `translateX(0px)`;
  };
  const slideToUserProfile = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (!userProfile.current) return;
    setFriendDetailModalData(undefined);
    userProfile.current.style.transform = `translateX(-300px)`;
  };
  const createFriendCards = (): JSX.Element[] => {
    return Object.entries(userData.friendData).map(([key, friendData]) => {
      return (
        <FriendCard
          friendData={friendData}
          setFriendDetailModalData={setFriendDetailModalData}
          key={key}
        />
      );
    });
  };
  const createFriendSection = () => (
    <UserProfileFriendSection>
      <header>
        <h3>Friends</h3>
        <MenuButton iconClass="fa-chevron-right" onClick={slideToUserProfile} />
      </header>
      <section className="user-profile__friend-card-container">
        {createFriendCards()}
      </section>
    </UserProfileFriendSection>
  );

  const createProfileSection = () => (
    <section className="user-profile__profile">
      <section className="userprofile__buttons">
        <MenuButton iconClass="fa-users" onClick={slideToFriendList} />
        <UserProfileNotification
          hasNewNotification={hasNewNotification}
          onClick={slideNotification}
        >
          <i className="fas fa-bell"></i>
          <div className="dot" />
        </UserProfileNotification>
      </section>
      <UserRectAvatar avatarUrl={userData.avatarUrl} width="120px" />
      <UserProfileInfo>
        <UserNameContainer>{userData.nickname}</UserNameContainer>
        <span className="userprofile__email">{userData.email}</span>
        <div className="userprofile__setting-button">Edit Profile</div>
      </UserProfileInfo>
    </section>
  );
  const createNotificationSection = () => (
    <section className="user-profile__notification">
      <div className="user-profile__notification__header">
        <MenuButton iconClass="fa-chevron-left" onClick={slideToUserProfile} />
        <h3>Notification</h3>
      </div>

      <div className="user-profile__notification-container">
        <div className="user-profile__notification-card-wrapper">
          {friendRequest.length > 0 ? (
            createNotification(friendRequest)
          ) : (
            <span>요청이 없습니다.</span>
          )}
        </div>
      </div>
    </section>
  );
  const createFriendDetailModal = () => {
    if (!friendDetailModalData) return <> </>;
    return (
      <FriendDetailModalContainer>
        <div className="friend-detail-modal-inner">
          <UserRectAvatar
            avatarUrl={friendDetailModalData.avatarUrl}
            width="100px"
          />
          <h2>{friendDetailModalData.nickname}</h2>
          <span className="email">{friendDetailModalData.email}</span>
          <span className="desc">{friendDetailModalData.description}</span>
          <div className="chat-button">
            <p>Start Chat</p>
          </div>
        </div>
        <div className="button-absolute">
          <MenuButton
            iconClass="fa-times"
            onClick={e => {
              e.preventDefault();
              setFriendDetailModalData(undefined);
            }}
          />
        </div>
      </FriendDetailModalContainer>
    );
  };
  return (
    <UserProfileContainer>
      <div className="user-profile__wrapper" ref={userProfile}>
        {createFriendSection()}
        {createProfileSection()}
        {createNotificationSection()}
      </div>
      {friendDetailModalData && createFriendDetailModal()}
    </UserProfileContainer>
  );
};

export default UserProfile;
