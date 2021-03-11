import styled from 'styled-components';

import { MESSAGE_TYPE } from '../components/chat/chatMessageType';

interface FlexDirection {
  isMine: boolean;
}

interface MessageType {
  type: MESSAGE_TYPE;
  isMine: boolean;
}

export const ChatMessageFlexDirection = styled.div<FlexDirection>`
  width: 100%;
  padding: 5px 20px;
  display: flex;
  justify-content: ${props => (props.isMine ? `flex-end` : `flex-start`)};
`;
export const MessageContainer = styled.div``;
export const ChatMessageContainer = styled.div<FlexDirection>`
  display: flex;
  flex-direction: ${props => (props.isMine ? `row` : `row-reverse`)};
  align-items: flex-start;
`;
export const Message = styled.div<MessageType>`
  background-color: ${props => (props.isMine ? props.theme.purple : `white`)};
  color: ${props => props.isMine && `white`};

  background-color: ${props =>
    props.type === MESSAGE_TYPE.File && `rgb(232,232,242)`};
  color: ${props => props.type === MESSAGE_TYPE.File && props.theme.purple};
  padding: 10px 20px;
  margin: 0 20px 10px 0;
  border-radius: 20px;
  max-width: 370px;
  font-weight: 400;
  line-height: 1.2;
  i {
    padding-right: 10px;
  }
  ${props =>
    props.type === MESSAGE_TYPE.Text &&
    (props.isMine
      ? `border-top-right-radius: 0;`
      : `border-top-left-radius: 0;`)}

  ${props =>
    props.type === MESSAGE_TYPE.File &&
    `
    font-weight: 600;
    &:hover {
    span {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  `}
`;
export const UserAvatar = styled.div``;