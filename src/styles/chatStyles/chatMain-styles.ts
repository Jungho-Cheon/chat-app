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

export const LogoContainer = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  img {
    width: 36px;
    height: 36px;
    margin-right: 10px;
    padding-bottom: 4px;
  }
  h1.logo {
    font-weight: 900;
    font-size: 2rem;
    color: ${props => props.theme.primaryText};
    font-family: 'Pangolin', cursive;
  }
`;
