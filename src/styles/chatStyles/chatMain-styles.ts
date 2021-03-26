import styled from 'styled-components';

export const ChatMainContainer = styled.div`
  height: 100%;
  padding: 20px 0;
  div.chat-main__background {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 20px 0;
    height: 100%;
    border-radius: 10px;
    background-color: ${props => props.theme.containerBackground};
  }
`;
