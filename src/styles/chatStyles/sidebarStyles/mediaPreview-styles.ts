import styled from 'styled-components';

export const MediaPreviewContainer = styled.div`
  position: relative;
  height: 45%;
  div.media-preview__title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 0 20px;
    h3 {
      font-weight: 700;
      color: ${props => props.theme.primaryText};
    }
    a {
      font-size: 0.8rem;
      font-weight: 700;
      color: ${props => props.theme.buttonActiveA};
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  div.media-preview__media-contents-container {
    position: relative;
    width: 100%;
    /* height: 100%; */
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0 20px;
    div.media-preview__media-contents {
      img {
        width: 85px;
        height: 85px;
        object-fit: cover;
        cursor: pointer;
      }
      img.primary {
        width: 260px;
        height: 260px;
        object-fit: cover;
      }
    }
    div.media-preview__show-more-gradient {
      position: absolute;
      bottom: 0;
      right: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 85px;
      height: 85px;
      background-color: rgba(0, 0, 0, 0.5);
      h3 {
        color: white;
      }
    }
  }
`;
