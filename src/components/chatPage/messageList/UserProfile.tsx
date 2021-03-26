import React from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from '../../../features/auth/authSlice';

// styled-components
import {
  UserProfileContainer,
  UserNameContainer,
  UserProfileInfo,
} from '../../../styles/chatStyles/userProfile-styles';
import UserAvatar from '../avatar/UserAvatar';

const UserProfile = (): JSX.Element => {
  const userData = useSelector(getUserData);
  return (
    <UserProfileContainer>
      <UserAvatar avatarUrl={userData.avatarUrl} width="100px" />
      <UserProfileInfo>
        <UserNameContainer>{userData.nickname}</UserNameContainer>
        <span className="userprofile__email">{userData.email}</span>
        <span className="userprofile__description">{userData.description}</span>
        <div className="userprofile__setting-button">프로필 설정</div>
      </UserProfileInfo>
    </UserProfileContainer>
  );
};

export default UserProfile;
