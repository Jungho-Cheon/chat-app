import styled from 'styled-components';

export const ChatMainContainer = styled.div`
  height: 100%;
  padding: 20px 0;
  div.chat-main__background {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-bottom: 20px;
    height: 100%;
    border-radius: 10px;
    background-color: ${props => props.theme.containerBackground};
  }
`;

export const LogoContainer = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  height: 60px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
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
