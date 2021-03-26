import styled from 'styled-components';

export const ChatSideBarContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: auto;
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

  /* &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: ${props => props.theme.secondaryText};
      border-radius: 50px;
    }
  } */
`;
