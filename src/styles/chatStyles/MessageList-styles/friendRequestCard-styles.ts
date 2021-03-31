import styled from 'styled-components';
import { AvatarContainer } from '../../userAvatar-styles';

export const FriendRequestCardContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 45px;
  padding-bottom: 5px;
  border-bottom: 1px solid ${props => props.theme.background};
  ${AvatarContainer} {
    margin-right: 10px;
  }
  div.friend-request-card__info {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    span {
      font-size: 0.7rem;
      color: ${props => props.theme.primaryText};
    }
  }
  div.friend-request-card__button-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-width: 40px;
    height: 100%;
    .friend-request-card__button {
      border-radius: 2px;
      height: 40%;
      width: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.7rem;
      background-color: ${props => props.theme.containerHovered};
      color: ${props => props.theme.primaryText};
      cursor: pointer;
    }
    .accept {
      margin-bottom: 2px;
    }
    .accept:hover {
      color: ${props => props.theme.buttonBackgroundA};
    }
    .reject:hover {
      color: ${props => props.theme.notification};
    }
    .accept.complete {
      color: ${props => props.theme.buttonBackgroundA};
      cursor: default;
    }
    .reject.complete {
      color: ${props => props.theme.notification};
      cursor: default;
    }
  }
`;
