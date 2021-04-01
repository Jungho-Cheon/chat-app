import styled from 'styled-components';

interface isOnlineProp {
  isOnline: boolean;
}

export const ParticipantsProfileContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 400px;
  min-height: 400px;
  div.participants-profile__profile-picture {
    position: relative;
    width: 100%;
    height: 60%;
    img.profile__background {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: ${props => props.theme.divider};
    }
    div.profile__profile-picture-background {
      position: absolute;
      top: 100px;
      left: 40px;
      width: 130px;
      height: 130px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${props => props.theme.containerBackground};
      border-radius: 15px;
      img.profile__profile-picture {
        z-index: 100;
        width: 120px;
        height: 120px;
        object-fit: cover;

        margin: 0;
        padding: 0;
        border-radius: 10px;
      }
    }

    div.participants-profile__profile-picture_gradient {
      width: 100%;
      height: 100%;
      z-index: 2;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 20px;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 70%,
        rgba(0, 0, 0, 0.3) 90%,
        rgba(0, 0, 0, 0.6) 100%
      );
      h3 {
        font-size: 1.3rem;
        font-weight: 700;
        color: white;
        margin: 10px 0;
      }
    }
  }
  div.participants-profile__profile-info {
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    height: 20%;
    h2 {
      font-size: 1.7rem;
      font-weight: 700;
      margin: 0 0 15px 0;
      color: ${props => props.theme.primaryText};
    }
    h3 {
      font-size: 0.98rem;
      font-weight: 700;
      margin-bottom: 5px;
      color: ${props => props.theme.secondaryText};
    }
    p {
      font-size: 0.8rem;
      font-weight: 400;
      color: ${props => props.theme.secondaryText};
      margin-bottom: 15px;
      i {
        margin-right: 5px;
      }
    }
  }
`;

export const PartnerStatus = styled.div<isOnlineProp>`
  position: absolute;
  top: 210px;
  right: 23%;
  display: flex;
  justify-content: start;
  align-items: center;
  p {
    color: white;
    font-size: 0.7rem;
  }
`;

export const StatusIndicator = styled.div<isOnlineProp>`
  width: 6px;
  height: 6px;
  background: ${props =>
    props.isOnline ? `rgb(68, 207, 114)` : props.theme.secondaryText};
  border-radius: 50%;
  margin: 4px;
`;
