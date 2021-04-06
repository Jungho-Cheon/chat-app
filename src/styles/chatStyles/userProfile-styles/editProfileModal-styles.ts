import styled from 'styled-components';

export const EditProfileModalContainer = styled.div`
  z-index: 300;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  section.edit-profile-modal__inner-container {
    position: relative;
    width: 400px;
    height: 500px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.primaryText};
    img.edit-profile-modal__profile-background {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      width: 100%;
      height: 200px;
      object-fit: cover;
    }
    div.edit-profile-modal__profile-picture-container {
      position: absolute;
      top: 100px;
      left: 40px;
      border-radius: 10px;
      width: 130px;
      height: 130px;
      background-color: ${props => props.theme.background};
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover {
        div.edit-profile-modal__profile-picture-change {
          opacity: 1;
        }
      }
      img.edit-profile-modal__profile-picture {
        width: 120px;
        height: 120px;
        border-radius: 10px;
        object-fit: cover;
      }
      div.edit-profile-modal__profile-picture-change {
        position: absolute;
        width: 120px;
        opacity: 0;
        height: 25px;
        bottom: 5px;
        background-color: ${props => props.theme.containerBackground};
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        transition: 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
        span {
          position: absolute;
          left: 50%;
          bottom: 5px;
          transform: translateX(-50%);
          z-index: 310;
          font-size: 0.8rem;
        }
      }
    }
    div.edit-profile-modal__profile-email {
      position: absolute;
      top: 160px;
      left: 200px;
      width: 40%;
      height: 1.6rem;
      background-color: ${props => props.theme.containerBackground};
      display: flex;
      padding: 0 10px;
      align-items: center;
      border-radius: 10px;
      p,
      i {
        font-size: 0.8rem;
      }
      i {
        padding-right: 10px;
      }
    }
    section.edit-profile-modal__edit-section {
      padding: 50px 45px 20px;
      display: flex;
      flex-direction: column;
      h3 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 10px;
      }
      input,
      textarea {
        border-radius: 10px;
        height: 30px;
        width: 100%;
        background-color: ${props => props.theme.containerBackground};
        border: none;
        outline: none;
        margin-bottom: 20px;
        color: ${props => props.theme.primaryText};
        padding: 10px;
        &:focus {
          border: 2px solid ${props => props.theme.buttonBackgroundA};
        }
      }
      textarea {
        width: 100%;
        height: 50px;
        resize: none;
      }
    }
  }
`;

interface SaveButtonProps {
  isLoading: boolean;
}
export const SaveButton = styled.div<SaveButtonProps>`
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border: 2px solid transparent;
  background-color: ${props =>
    props.isLoading
      ? props.theme.buttonBackgroundB
      : props.theme.buttonBackgroundA};
  width: 100px;
  height: 30px;
  cursor: pointer;
  transition: 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
  &:hover {
    background-color: ${props =>
      props.isLoading
        ? props.theme.buttonHoveredB
        : props.theme.buttonHoveredA};
  }
  &:active {
    border: 2px solid ${props => props.theme.primaryText};
    background-color: ${props =>
      props.isLoading ? props.theme.buttonActiveB : props.theme.buttonActiveA};
  }
`;
