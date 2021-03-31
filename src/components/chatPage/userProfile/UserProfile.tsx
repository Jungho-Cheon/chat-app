import React, { useRef } from 'react';

// styled-components
import { UserProfileContainer } from '../../../styles/chatStyles/userProfile-styles/userProfile-styles';

// user info client
import NotificationSection from './NotificationSection';
import ProfileSection from './ProfileSection';
import FriendSection from './FriendSection';

const UserProfile = (): JSX.Element => {
  const userProfile = useRef<HTMLDivElement>(null);

  return (
    <UserProfileContainer>
      <div className="user-profile__wrapper" ref={userProfile}>
        <FriendSection userProfile={userProfile.current} />
        <ProfileSection userProfile={userProfile.current} />
        <NotificationSection
          userProfile={userProfile.current}
        />
      </div>
    </UserProfileContainer>
  );
};

export default UserProfile;
