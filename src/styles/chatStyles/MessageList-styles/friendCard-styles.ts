import styled from 'styled-components';

export const FriendCardContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 80px;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
  div.friend-card__user-avatar-container {
    position: relative;
  }
  h4 {
    font-weight: 400;
    font-size: 0.8rem;
    margin: 5px 0;
    color: ${props => props.theme.primaryText};
    text-align: center;
  }
  p {
    font-size: 0.7rem;
    color: ${props => props.theme.secondaryText};
  }
  margin: 0 2px 8px;
  &:nth-child(4n-3) {
    margin: 0 2px 8px 0;
  }
  &:nth-child(4n) {
    margin: 0 0 8px 4px;
  }
  &:hover {
    background-color: ${props => props.theme.background};
  }
  &:active {
    background-color: ${props => props.theme.navbarBackground};
  }
`;

interface FriendCardLoginCheckDotProps {
  isLoggin: boolean;
}
export const FriendCardLoginCheckDot = styled.div<FriendCardLoginCheckDotProps>`
  position: absolute;
  width: 10px;
  height: 10px;
  bottom: 1px;
  right: 1px;
  border-radius: 50%;
  background-color: ${props =>
    props.isLoggin ? props.theme.buttonBackgroundB : props.theme.secondaryText};
`;

