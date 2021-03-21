import styled from 'styled-components';

interface FlexDirection {
  isMine: boolean;
}

interface MessageType {
  type: string;
  isMine: boolean;
  isCompleted: boolean;
}

export const ChatMessageFlexDirection = styled.div<FlexDirection>`
  width: 100%;
  padding: 5px 20px;
  display: flex;
  justify-content: ${props => (props.isMine ? `flex-end` : `flex-start`)};
`;
export const MessageContainer = styled.div<FlexDirection>`
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.isMine ? `flex-end` : `flex-start`)};
  .message__wrapper {
    display: flex;
    flex-direction: ${props => (props.isMine ? `row` : `row-reverse`)};
    /* justify-content: ${props => (props.isMine ? `flex-end` : ``)}; */
    align-items: center;
    .message__time {
      min-width: 45px;
      color: ${props => props.theme.secondaryText};
      font-size: 0.6rem;
      margin-bottom: 20px;
      align-self: flex-end;
    }
    i.complete {
      margin-top: 10px;
      color: ${props => props.theme.secondaryText};
      -webkit-animation: rotating 2s cubic-bezier(0.215, 0.61, 0.355, 1)
        infinite;
      -moz-animation: rotating 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
      -ms-animation: rotating 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
      -o-animation: rotating 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
      animation: rotating 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
    }
    @-webkit-keyframes rotating /* Safari and Chrome */ {
      from {
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      to {
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
    @keyframes rotating {
      from {
        -ms-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
      }
      to {
        -ms-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
      }
    }
  }
`;
export const ChatMessageContainer = styled.div<FlexDirection>`
  display: flex;
  flex-direction: ${props => (props.isMine ? `row` : `row-reverse`)};
  align-items: flex-start;
  .message__read {
    font-size: 0.7rem;
    color: ${props => props.theme.secondaryText};
    padding-right: 20px;
  }
`;
export const Message = styled.div<MessageType>`
  opacity: ${props => (props.isCompleted ? 1 : 0.5)};
  background-color: ${props =>
    props.isMine ? props.theme.purple : props.theme.background};
  color: ${props => (props.isMine ? `white` : props.theme.primaryText)};
  width: auto;
  background-color: ${props => props.type === 'FILE' && `rgb(232,232,242)`};
  color: ${props => props.type === 'FILE' && props.theme.purple};
  padding: 10px 20px;
  margin: 5px 10px 10px;
  border-radius: 20px;
  font-weight: 400;
  line-height: 1.2;
  word-break: break-all;
  white-space: initial;
  i {
    padding-right: 10px;
  }
  ${props =>
    props.type === 'TEXT' &&
    (props.isMine
      ? `border-top-right-radius: 0;`
      : `border-top-left-radius: 0;`)}

  ${props =>
    props.type === 'FILE' &&
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
