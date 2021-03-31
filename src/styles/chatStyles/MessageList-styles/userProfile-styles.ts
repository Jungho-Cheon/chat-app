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
    section.user-profile__profile {
      position: relative;
      height: 100%;
      width: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      section.userprofile__buttons {
        width: 100%;
        height: 60px;
        min-height: 60px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 20px;
      }
    }
    section.user-profile__notification {
      position: relative;
      height: 100%;
      width: 300px;
      display: flex;
      flex-direction: column;
      div.user-profile__notification__header {
        display: flex;
        align-items: center;
        min-height: 60px;
        background-color: ${props => props.theme.navbarBackground};
        padding: 0 15px;
        h3 {
          color: ${props => props.theme.primaryText};
          font-size: 1.2rem;
          font-weight: 700;
          padding-left: 10px;
        }
        div.user-profile__notification__back-button {
          width: 35px;
          height: 35px;
          border-radius: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          margin: 0 15px;
          i.fa-chevron-left {
            color: ${props => props.theme.primaryText};
            cursor: pointer;
            transition: color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
          }
          &:hover {
            background-color: ${props => props.theme.containerHovered};
          }
          &:active {
            i.fa-chevron-left {
              color: ${props => props.theme.buttonBackgroundA};
            }
          }
        }
      }

      div.user-profile__notification-container {
        flex: 1 1 auto;
        width: 100%;
        padding: 10px 5px 0px 15px;
        div.user-profile__notification-card-wrapper {
          position: relative;
          width: 100%;
          height: 220px;
          overflow-y: auto;
          &::-webkit-scrollbar {
            width: 5px;
          }
          &::-webkit-scrollbar-thumb {
            background-color: transparent;
            border-radius: 50px;
          }
          &::-webkit-scrollbar-track {
            background-color: transparent;
          }

          &:hover {
            &::-webkit-scrollbar-thumb {
              background-color: ${props => props.theme.secondaryText};
              border-radius: 50px;
            }
          }
          span {
            padding-left: 10px;
            color: ${props => props.theme.secondaryText};
            font-size: 0.7rem;
          }
        }
      }
    }
  }
`;

export const UserProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px 0;
  width: 100%;
  span.userprofile__email {
    font-size: 0.9rem;
    color: ${props => props.theme.secondaryText};
    margin-bottom: 10px;
    white-space: nowrap;
    text-align: center;
    text-overflow: ellipsis;
  }
  span.userprofile__description {
    display: -webkit-box;
    font-size: 0.8rem;
    color: ${props => props.theme.primaryText};
    margin-bottom: 10px;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    -webkit-line-clamp: 3; /* 라인수 */
    -webkit-box-orient: vertical;
    line-height: 15px; //for not webkit browser
    max-height: 45px;
  }
  div.userprofile__setting-button {
    width: 80%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.buttonBackgroundA};
    border: 1px solid ${props => props.theme.divider};
    border-radius: 5px;
    font-size: 0.9rem;
    font-weight: 700;
    color: ${props => props.theme.primaryText};
    transition: 1s cubic-bezier(0.19, 1, 0.22, 1);
    cursor: pointer;

    &:hover {
      background-color: ${props => props.theme.buttonHoveredA};
    }
    &:active {
      background-color: ${props => props.theme.buttonActiveA};
    }
  }
`;

export const UserNameContainer = styled.div`
  width: 200px;
  font-size: 1.5rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  color: ${props => props.theme.primaryText};
  margin-bottom: 10px;
`;

export const UserProfileFriendsButton = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  i.fa-users {
    color: ${props => props.theme.primaryText};
    transition: color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  }
  &:hover {
    background-color: ${props => props.theme.containerHovered};
  }
  &:active {
    i.fa-users {
      color: ${props => props.theme.buttonBackgroundA};
    }
  }
`;

export const UserProfileFriendSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    height: 60px;
    min-height: 60px;
    background-color: ${props => props.theme.navbarBackground};
    h3 {
      color: ${props => props.theme.primaryText};
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
  section.user-profile__friend-card-container {
    flex: 1 1 auto;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 5px;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: transparent;
      border-radius: 50px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }

    &:hover {
      &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.secondaryText};
        border-radius: 50px;
      }
    }
  }
`;

export const FriendDetailModalContainer = styled.section`
  position: absolute;
  z-index: 100;
  left: 0;
  top: 60px;
  width: 100%;
  height: 200px;
  padding: 20px;
  color: ${props => props.theme.primaryText};
  background-color: ${props => props.theme.containerBackground};
  h1 {
    align-self: flex-start;
    font-size: 1.4rem;
    font-weight: 700;
  }
  div.friend-detail-modal-inner {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
      font-size: 1.4rem;
      font-weight: 700;
      font-family: 'Noto Sans KR Light', sans-serif;
      margin-top: 10px;
    }
    span {
      font-size: 0.8rem;
      color: ${props => props.theme.secondaryText};
      &.email {
        margin-bottom: 5px;
      }
      &.desc {
        height: 15px;
        margin-bottom: 10px;
      }
    }
    div.chat-button {
      width: 100px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      border: 1px solid ${props => props.theme.primaryText};
      cursor: pointer;
      transition: 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
      &:hover {
        border: 1px solid ${props => props.theme.buttonBackgroundA};
        background-color: ${props => props.theme.buttonBackgroundA};
        color: ${props => props.theme.primaryText};
      }
      &:active {
        border: 1px solid ${props => props.theme.primaryText};
      }
      p {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
      }
    }
  }
  div.button-absolute {
    position: absolute;
    top: 15px;
    right: 20px;
  }
`;
