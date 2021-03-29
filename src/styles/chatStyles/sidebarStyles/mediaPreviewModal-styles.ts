import styled from 'styled-components';

interface MediaPreviewModalContainerProps {
  isModalOpened: boolean;
}

export const MediaPreviewModalContainer = styled.div<MediaPreviewModalContainerProps>`
  position: fixed;
  z-index: 300;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: ${props => (props.isModalOpened ? `flex` : `none`)};
  justify-content: center;
  align-items: center;
  div.media-preview-modal__inner {
    position: relative;
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    div.media-preview-modal__prev-button {
      height: 40px;
      width: 40px;
      font-size: 2rem;
      color: white;
      margin: 20px;
      cursor: pointer;
    }
    div.media-preview-modal__media-box {
      display: flex;
      justify-content: center;
      flex: 1;
      display: relative;
      height: 85%;
      div.media-preview-modal__media-box__userinfo {
        position: fixed;
        padding: 0 20px;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: start;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 10px;
        height: 50px;
        width: 30%;
        h3 {
          padding: 0 10px;
          font-size: 1.2rem;
          color: white;
        }
        span {
          flex: 1 1 auto;
          padding-top: 4px;
          font-size: 0.8rem;
          color: white;
          margin-left: 10px;
        }
        div.media-preview-modal__media-box__download-button {
          display: flex;
          border-radius: 10px;
          justify-content: center;
          align-items: center;
          border: 1px solid white;
          height: 50%;
          width: 80px;
          color: white;
          font-size: 0.8rem;
          cursor: pointer;
          &:hover {
            background-color: rgba(255, 255, 255, 0.3);
          }
          &:active {
            background-color: rgba(255, 255, 255, 0.8);
          }
        }
      }
      img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    }
    div.media-preview-modal__next-button {
      height: 40px;
      width: 40px;
      font-size: 2rem;
      color: white;
      margin: 20px;
      cursor: pointer;
    }
  }
  div.media-preview-modal__slide-bar {
    position: fixed;
    bottom: 0;
    height: 100px;
    width: 510px;
    display: flex;
    justify-content: center;
    img {
      width: 100px;
      height: 100px;
      object-fit: cover;
      margin: 0 1px;
      cursor: pointer;
    }
  }
`;

interface SlideBarImageProps {
  isCurrentImage: boolean;
}
export const SlideBarImage = styled.img<SlideBarImageProps>`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin: 0 1px;
  ${props =>
    props.isCurrentImage &&
    `
  margin: 0;
  border: 2px solid ${props.theme.buttonBackgroundA};
  `}
`;
