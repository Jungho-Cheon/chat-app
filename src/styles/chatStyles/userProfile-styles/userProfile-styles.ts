import styled from 'styled-components';

interface UserProfileNotificationProps {
  hasNewNotification: boolean;
}

export const UserProfileNotification = styled.div<UserProfileNotificationProps>`
  position: relative;
  width: 35px;
  height: 35px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  i.fa-bell {
    color: ${props => props.theme.primaryText};
    transition: color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  div.dot {
    position: absolute;
    border-radius: 50%;
    bottom: 5px;
    right: 5px;
    z-index: 5;
    width: 7px;
    height: 7px;
    background-color: ${props =>
      props.hasNewNotification
        ? props.theme.notification
        : props.theme.secondaryText};
  }
  &:hover {
    background-color: ${props => props.theme.containerHovered};
  }
  &:active {
    i.fa-bell {
      color: ${props => props.theme.buttonBackgroundA};
    }
  }
`;

export const UserProfileContainer = styled.div`
  background-color: ${props => props.theme.containerBackground};
  border-radius: 5px;
  position: relative;
  height: 100%;
  overflow: hidden;
  div.user-profile__wrapper {
    position: absolute;
    height: 100%;
    width: 900px;
    display: flex;
    align-items: center;
    transition: transform 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
    transform: translateX(-300px);
  }
`;

