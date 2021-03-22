import styled from 'styled-components';

export const ChatPaneContainer = styled.div`
  position: absolute;
  bottom: 100px;
  width: 100%;
  height: 100%;
  max-height: calc(100% - 320px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow-y: scroll;
  overflow-x: hidden;
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
  div.ChatPane__typing {
    position: absolute;
    bottom: 20px;
    left: 100px;

    p {
      color: red;
    }
  }
`;

export const ChatPaneWrapper = styled.div`
  height: 100%;
`;

export const ChatPaneNewMessageContainer = styled.div`
  position: absolute;
  bottom: 118px;
  left: 50%;
  height: 33px;
  width: 200px;
  text-align: center;
  border-radius: 20px;
  transform: translateX(-50%);
  background-color: ${props => props.theme.orange};
  color: white;
  font-size: 0.7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  i {
    padding-top: 2px;
    padding-right: 7px;
  }
  &:hover {
    background-color: ${props => props.theme.orangeHovered};
  }
  &:active {
    background-color: ${props => props.theme.purple};
  }
`;
