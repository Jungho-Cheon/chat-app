import styled from 'styled-components';

export const ChatInputContainer = styled.div`
  width: 95%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: white;
  margin: 0 auto;
  border-radius: 10px;
  box-shadow: 0 0 13px 1px rgba(0, 0, 0, 0.1);
  position: relative;
  div.ChatInput__Typing {
    z-index: 10;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 50%;
    top: -30px;
    height: 30px;
    text-align: center;
    transform: translateX(-50%);
    border-radius: 20px;
    div.wave {
      position: relative;
      height: 20px;
      margin-right: 3px;
      div.dot {
        display: inline-block;
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        margin-right: 3px;
        background: ${props => props.theme.primaryText};
        animation: wave 1.3s linear infinite;

        &:nth-child(2) {
          animation-delay: -1.1s;
        }

        &:nth-child(3) {
          animation-delay: -0.9s;
        }
        @keyframes wave {
          0%,
          60%,
          100% {
            transform: initial;
          }

          30% {
            transform: translateY(-5px);
          }
        }
      }
    }
    p {
      color: ${props => props.theme.primaryText};
      font-size: 0.7rem;
      span {
        font-weight: 400;
      }
    }
  }
`;

export const UploadFileButton = styled.div`
  margin-right: 20px;
  width: 16px;
  color: ${props => props.theme.secondaryText};
  font-size: 1.2rem;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.buttonHoveredA};
  }
  &:active {
    color: ${props => props.theme.buttonActiveA};
  }
`;

export const ChatTextInput = styled.input`
  width: 80%;
  border: 1px solid ${props => props.theme.containerBorder};
  outline: none;
  height: 35px;
  font-size: 1.1rem;
  padding: 1px 0 0 10px;
  border-radius: 10px;
  transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  background-color: transparent;
  color: ${props => props.theme.primaryText};
`;

export const EmojiButton = styled.div`
  color: ${props => props.theme.secondaryText};
  font-size: 1.2rem;
  margin-left: 20px;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.buttonHoveredA};
  }
  &:active {
    color: ${props => props.theme.buttonActiveA};
  }
`;

export const EmojiPickerWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 250;
`;
export const EmojiPickerContainer = styled.section`
  position: absolute;
  bottom: 60px;
  right: 0px;
  z-index: 250;
  * {
    box-shadow: none;
  }
`;
export const ChatSendButton = styled.div`
  width: 30px;
  height: 30px;
  min-width: 30px;
  color: white;
  background-color: ${props => props.theme.buttonBackgroundA};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 0 0 0 20px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.buttonBackgroundA};
  }
  &:active {
    background-color: ${props => props.theme.buttonBackgroundB};
  }
`;
