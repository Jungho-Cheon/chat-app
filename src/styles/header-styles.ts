import styled from 'styled-components';

export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 60px;
  margin: 20px;
`;
export const UserMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const NewMessageButton = styled.button`
  min-width: 150px;
  padding: 10px 20px;
  color: white;
  background-color: ${props => props.theme.orange};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  outline: none;
  border-radius: 0.3rem;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  i {
    padding: 0 10px 0 0;
  }

  &:hover {
    background-color: rgba(244, 118, 85, 0.7);
  }
`;
export const NotificationButton = styled.div`
  position: relative;
  margin: 0 30px;
  min-width: 1.1rem;
  height: 1.1rem;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  &:hover {
    color: #aaa;
  }
`;
export const AlertPoint = styled.div`
  width: 5px;
  height: 5px;
  background-color: rgba(244, 118, 85, 1);
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
`;

export const UserInfoDropdownContents = styled.div`
  display: none;
  position: absolute;
  ul {
    position: relative;
    background-color: #fff;
    min-width: 160px;
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
    z-index: 1;
    border-radius: 0.3rem;
    padding: 10px 0;
    &:after,
    &:before {
      bottom: 100%;
      left: 10px;
      border: solid transparent;
      content: '  ';
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }

    &:after {
      border-color: rgba(255, 255, 255, 0);
      border-bottom-color: #ffffff;
      border-width: 5px;
      left: 11px;
      background-clip: padding-box;
    }

    &:before {
      border-color: rgba(184, 184, 184, 0);
      border-bottom-color: white;
      border-width: 6px;
      background-clip: padding-box;
    }
  }
  div {
    height: 20px;
    width: 100%;
    position: relative;
    background: rgba(0, 0, 0, 0);
  }
  li {
    padding: 8px 12px;
    &:hover {
      color: rgba(244, 118, 85, 0.7);
      cursor: pointer;
    }
  }
`;

export const UserInfoContainer = styled.div`
  position: relative;
  display: flex;
  width: 150px;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  &:hover {
    color: #aaa;
  }
`;

export const UserAvatar = styled.img`
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 50%;
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  p {
    font-size: 0.8rem;
    color: ${props => props.theme.secondaryText};
    padding: 0 15px;
  }
  i {
    color: ${props => props.theme.secondaryText};
  }
`;

export const UserInfoDropdown = styled.div`
  position: relative;
  display: inline-block;
  &:hover ${UserInfoDropdownContents} {
    display: block;
  }
  &:hover i {
    display: none;
  }
`;
