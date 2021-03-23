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
  * {
    pointer-events: none;
  }
`;
export const ChatMessageContainer = styled.div`
  position: relative;
  .message__dateDivider {
    width: 100%;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: -20px;
    .message__dateDivider__line {
      z-index: 0;
      position: absolute;
      padding: 0 60px;
      width: 20%;
      height: 1px;
      background-color: ${props => props.theme.divider};
    }
    .message__dateDivider__date {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 30px;
      z-index: 1;
      font-size: 0.8rem;
      color: ${props => props.theme.secondaryText};
      background-color: ${props => props.theme.mainBackground};
    }
  }
`;
export const ChatPaneNewMessageContainer = styled.div`
  position: absolute;
  bottom: 118px;
  left: 50%;
  transform: translateX(-50%);
  height: 33px;
  width: 200px;
  text-align: center;
  border-radius: 20px;
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

export const ChatPaneAddFileModelContainer = styled.section`
  position: absolute;
  z-index: 200;
  bottom: 40%;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img.ChatPane__AddFile {
    z-index: 200;
    width: 100px;
    height: 100px;
  }
`;
