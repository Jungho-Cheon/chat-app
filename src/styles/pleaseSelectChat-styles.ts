import styled from 'styled-components';

export const PleaseSelectChatContainer = styled.div`
  padding: 0 40px;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    width: 10vw;
    height: 10vw;
    padding: 20px;
  }
  h1 {
    font-size: 1.2rem;
    font-weight: 400;
    color: ${props => props.theme.primaryText};
  }
`;
