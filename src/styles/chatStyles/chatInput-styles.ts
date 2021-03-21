import styled from 'styled-components';

export const ChatInputContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  div.Chat__typing {
    position: absolute;
    left: 50%;
    top: -40px;
    height: 30px;
    padding: 8px 20px;
    text-align: center;
    transform: translateX(-50%);
    border-radius: 20px;
    background-color: ${props => props.theme.orange};
    p {
      color: white;
      font-size: 0.7rem;
      span {
        font-weight: 700;
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
    color: ${props => props.theme.orangeHovered};
  }
`;

export const ChatTextInput = styled.input`
  width: 80%;
  border: 4px solid transparent;
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
    color: ${props => props.theme.orangeHovered};
  }
`;

export const EmojiPickerWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: transparent;
  z-index: 1;
`;
export const EmojiPickerContainer = styled.section`
  position: absolute;
  bottom: 100px;
  right: 60px;
  z-index: 2;
`;
export const ChatSendButton = styled.div`
  width: 50px;
  height: 50px;
  min-width: 50px;
  color: white;
  background-color: ${props => props.theme.orange};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin: 0 20px;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.orangeHovered};
  }
  &:active {
    background-color: ${props => props.theme.purple};
  }
`;
