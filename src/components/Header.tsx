import React from 'react';

// styled-components
import {
  HeaderContainer,
  UserMenu,
  NewMessageButton,
  NotificationButton,
  UserInfoContainer,
  UserInfo,
  AlertPoint,
} from '../styles/header-styles';
import UserAvatar from './avatar/UserAvatar';

const Header = (): JSX.Element => {
  return (
    <HeaderContainer>
      <UserMenu>
        <NewMessageButton>
          <i className="fas fa-plus"></i>
          New Message
        </NewMessageButton>
        <NotificationButton>
          <i className="far fa-bell"></i>
          {/* TODO: Alert 분기 작성 */}
          <AlertPoint />
        </NotificationButton>
        {/* TODO: User Data에서 프로필 사진 URL가져오기 */}

        <UserInfoContainer>
          <UserAvatar avatarUrl="assets/antonio.jpg" width="40px" />
          <UserInfo>
            <p>천정호 님</p>
          </UserInfo>
        </UserInfoContainer>
      </UserMenu>
    </HeaderContainer>
  );
};

export default Header;
