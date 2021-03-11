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
export const ChatMessageContainer = styled.div<MessageType>`
  display: flex;
  flex-direction: ${props => (props.isMine ? `row` : `row-reverse`)};
  align-items: flex-end;
`;
export const Message = styled.div<MessageType>`
  background-color: ${props => (props.isMine ? props.theme.purple : `white`)};
  color: ${props => props.isMine && `white`};

  background-color: ${props =>
    props.type === MESSAGE_TYPE.File && `rgb(232,232,242)`};
  color: ${props => props.type === MESSAGE_TYPE.File && props.theme.purple};
  padding: 10px 20px;
  margin: 0 20px;
  border-radius: 20px;
  ${props =>
    props.type === MESSAGE_TYPE.Text &&
    (props.isMine
      ? `border-bottom-right-radius: 0;`
      : `border-bottom-left-radius: 0;`)}

  ${props =>
    props.type === MESSAGE_TYPE.File &&
    `cursor: pointer; &:hover{p::after{contenr: ''; width:100%; height:1px; background-color:${props.theme.purple}}}`}

  &:hover {
    span {
      text-decoration: underline;
    }
  }

  font-weight: 600;
  i {
    padding-right: 10px;
  }
`;
export const UserAvatar = styled.div``;
