import React, { useEffect, useRef, useState } from 'react';

// styled-components
import { UserProfileContainer } from '../../../styles/chatStyles/userProfile-styles/userProfile-styles';

// user info client
import NotificationSection from './NotificationSection';
import ProfileSection from './ProfileSection';
import FriendSection from './FriendSection';

const UserProfile = (): JSX.Element => {
  // const userProfile = useRef<HTMLDivElement>(null);
  const [userProfile, setUserProfile] = useState<HTMLDivElement|null>();
  return (
    <UserProfileContainer>
      <div className="user-profile__wrapper" ref={el => setUserProfile(el)}>
        {userProfile && (
          <>
            <FriendSection userProfile={userProfile} />
            <ProfileSection userProfile={userProfile} />
            <NotificationSection userProfile={userProfile} />
          </>
        )}
      </div>
    </UserProfileContainer>
  );
};

export default UserProfile;
