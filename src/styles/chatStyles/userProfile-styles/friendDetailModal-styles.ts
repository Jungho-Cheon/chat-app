import styled from 'styled-components';

export const FriendDetailModalContainer = styled.section`
  position: absolute;
  z-index: 100;
  left: 0;
  top: 60px;
  width: 100%;
  height: 100%;
  padding: 20px;
  color: ${props => props.theme.primaryText};
  background-color: ${props => props.theme.containerBackground};
  h1 {
    align-self: flex-start;
    font-size: 1.4rem;
    font-weight: 700;
  }
  div.friend-detail-modal-inner {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
      font-size: 1.4rem;
      font-weight: 700;
      font-family: 'Noto Sans KR Light', sans-serif;
      margin-top: 10px;
    }
    span {
      font-size: 0.8rem;
      color: ${props => props.theme.secondaryText};
      &.email {
        margin-bottom: 5px;
      }
      &.desc {
        height: 15px;
        margin-bottom: 10px;
      }
    }
    div.chat-button {
      width: 100px;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      border: 1px solid ${props => props.theme.primaryText};
      cursor: pointer;
      transition: 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
      &:hover {
        border: 1px solid ${props => props.theme.buttonBackgroundA};
        background-color: ${props => props.theme.buttonBackgroundA};
        color: ${props => props.theme.primaryText};
      }
      &:active {
        border: 1px solid ${props => props.theme.primaryText};
      }
      p {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
      }
    }
  }
  div.button-absolute {
    position: absolute;
    top: 15px;
    right: 20px;
  }
`;
