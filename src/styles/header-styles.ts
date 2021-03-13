import styled from 'styled-components';

export const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  height: 40px;
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
    background-color: ${props => props.theme.orangeHovered};
  }
  &:active {
    background-color: ${props => props.theme.purple};
  }
`;
export const NotificationButton = styled.div`
  position: relative;
  margin: 0 30px;
  min-width: 1.1rem;
  height: 1.1rem;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  color: ${props => props.theme.primaryText};
  &:hover {
    color: ${props => props.theme.orangeHovered};
  }
  &:active {
    color: ${props => props.theme.purple};
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

export const UserInfoContainer = styled.div`
  position: relative;
  display: flex;
  width: 200px;
  cursor: pointer;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  &:hover {
    color: #aaa;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 170px;
  flex-grow: 1;
  p {
    font-size: 0.8rem;
    color: ${props => props.theme.primaryText};
    padding: 0 15px;
  }
`;
