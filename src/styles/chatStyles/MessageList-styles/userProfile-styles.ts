import styled from 'styled-components';

export const UserProfileContainer = styled.div`
  background-color: ${props => props.theme.containerBackground};
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-left: 20px;
  div.user-profile__notification {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 16px;
    height: 20px;
    i.fa-bell {
      color: ${props => props.theme.primaryText};
      cursor: pointer;
      transition: color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    div.dot {
      position: absolute;
      border-radius: 50%;
      bottom: 0px;
      right: 0px;
      z-index: 5;
      width: 5px;
      height: 5px;
      background-color: ${props => props.theme.secondaryText};
    }
    &:active {
      i.fa-bell {
        color: ${props => props.theme.buttonHoveredA};
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
    font-size: 0.9rem;
    font-weight: 700;
    border-radius: 5px;
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
  font-size: 1.1rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  color: ${props => props.theme.primaryText};
  margin-bottom: 10px;
`;
