import React from 'react';

// styled-components
import {
  HeaderContainer,
  UserMenu,
  NewMessageButton,
  NotificationButton,
  UserInfoContainer,
  UserAvatar,
  UserInfo,
  UserInfoDropdown,
  AlertPoint,
  UserInfoDropdownContents,
} from '../styles/header-styles';

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
        <UserInfoDropdown>
          <UserInfoContainer>
            <UserAvatar src="assets/antonio.jpg" />
            <UserInfo>
              <p>천정호 님</p>
              <i className="fas fa-caret-down"></i>
            </UserInfo>
          </UserInfoContainer>
          <UserInfoDropdownContents>
            <div></div>
            <ul>
              <li>Profile</li>
              <li>Logout</li>
              <li>Project Info</li>
            </ul>
          </UserInfoDropdownContents>
        </UserInfoDropdown>
      </UserMenu>
    </HeaderContainer>
  );
};

export default Header;
