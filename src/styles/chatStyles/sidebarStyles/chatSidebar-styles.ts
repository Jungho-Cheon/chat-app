import styled from 'styled-components';

export const ChatSideBarContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 0;
  position: relative;
  overflow: hidden;
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
  div.chat-sidebar__inner {
    height: 100%;
    width: 100%;
    background-color: ${props => props.theme.containerBackground};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
  }
`;
