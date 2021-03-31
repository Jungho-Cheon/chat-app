import styled from 'styled-components';

export const DiscoverFriendModalCardContainer = styled.div`
  width: 90px;
  height: 120px;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${props => props.theme.containerBackground};
  border-radius: 5px;
  &:nth-child(3n - 2) {
    margin: 0 0 10px 0;
  }
  &:nth-child(3n - 1) {
    margin: 0 10px 0;
  }
  &:nth-child(3n) {
    margin: 0 0 10px 0;
  }
  h3 {
    font-size: 0.8rem;
    font-weight: 700;
    width: 80px;
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: ${props => props.theme.primaryText};
    margin-top: 5px;
    margin-bottom: 3px;
  }
  span {
    font-size: 0.6rem;
    color: ${props => props.theme.secondaryText};
    margin-bottom: 5px;
  }

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

interface FriendRequestButtonProps {
  status: string;
}
export const FriendRequestButton = styled.div<FriendRequestButtonProps>`
  width: 60px;
  height: 20px;
  color: ${props =>
    'IDLE' === props.status
      ? props.theme.secondaryText
      : props.theme.background};
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
  background-color: ${props =>
    'IDLE' === props.status
      ? props.theme.background
      : props.theme.buttonBackgroundB};
  &:hover {
    background-color: ${props => props.theme.buttonHoveredA};
    color: ${props => props.theme.background};
  }
  &:active {
    background-color: ${props => props.theme.buttonActiveA};
    color: ${props => props.theme.primaryText};
  }
  ${props =>
    props.status === 'REJECT' &&
    `
  color: ${props.theme.primaryText};
  background-color: ${props.theme.notification};
  pointer-events: none;
  `}
`;
