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
  position: relative;
`;

export const MessageArticle = styled.div`
  position: relative;
  i.fa-spinner {
    position: absolute;
    right: -25px;
    top: 5px;
  }
`;
export const MessageContainer = styled.div<FlexDirection>`
  max-width: 480px;
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.isMine ? `flex-end` : `flex-start`)};
  .message__dateDivider__inner {
    width: 240px;
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    top: -25px;
    left: -50%;
    ${props => (props.isMine ? `right: 0px` : `left: 0px`)};
    .message__dateDivider__line {
      z-index: 0;
      position: absolute;
      padding: 0 60px;
      width: 100%;
      height: 1px;
      background-color: ${props => props.theme.divider};
    }
    .message__dateDivider__date {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80px;
      height: 30px;
      z-index: 1;
      font-size: 0.8rem;
      color: ${props => props.theme.secondaryText};
      background-color: ${props => props.theme.containerBackground};
    }
  }
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
  z-index: 10;
  display: flex;
  flex-direction: ${props => (props.isMine ? `row` : `row-reverse`)};
  align-items: flex-start;
  .message__read {
    font-size: 0.7rem;
    color: ${props => props.theme.secondaryText};
    padding-right: 20px;
    padding-bottom: 10px;
  }
`;
export const MessageWrapper = styled.div<MessageType>`
  z-index: 10;
  width: auto;
  opacity: ${props => (props.isCompleted ? 1 : 0.5)};
  color: ${props => (props.isMine ? `white` : props.theme.primaryText)};
  color: ${props => props.type === 'FILE' && props.theme.buttonBackgroundA};
  background-color: ${props =>
    props.isMine ? props.theme.buttonBackgroundA : props.theme.background};
  background-color: ${props => props.type === 'FILE' && `rgb(232,232,242)`};
  padding: 10px 20px;
  ${props =>
    ['IMAGE', 'URL'].includes(props.type) && `background: none; padding: 0;`};
  margin: 5px 10px 10px;
  border-radius: 5px;
  font-weight: 400;
  line-height: 1.2;
  word-break: break-all;
  white-space: initial;
  img.message__image {
    position: relative;
    z-index: 5;
    border-radius: 5px;
    width: 300px;
    /* transition: 0.6s cubic-bezier(0.215, 0.61, 0.355, 1); */
  }
  i.fa-file {
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
    font-weight: 400;
    &:hover {
    span {
      text-decoration: underline;
      cursor: pointer;
    }
  }
  `}
  div.message__url {
    width: 300px;
    background-color: ${props => props.theme.background};
    cursor: pointer;
    img.message__url__image {
      width: 300px;
      object-fit: contain;
    }
    div.message__url__info {
      color: ${props => props.theme.primaryText};
      padding: 10px;
      h3 {
        font-size: 1.2rem;
        padding-bottom: 5px;
      }
      p {
        font-size: 0.8rem;
        padding: 5px 0;
      }
      span {
        color: ${props => props.theme.secondaryText};
        font-size: 0.8rem;
      }
    }
  }
`;
