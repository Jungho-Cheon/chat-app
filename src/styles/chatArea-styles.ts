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
`;

export const ChatPaneWrapper = styled.div`
  height: 100%;
`;
