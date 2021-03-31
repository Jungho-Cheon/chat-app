import styled from 'styled-components';

export const NotificationSectionContainer = styled.div`
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
`;
