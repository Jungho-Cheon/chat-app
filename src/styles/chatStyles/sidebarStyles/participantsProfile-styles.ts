import styled from 'styled-components';

interface isOnlineProp {
  isOnline: boolean;
}

export const ParticipantsProfileContainer = styled.div`
  position: relative;
  height: 50%;
  min-height: 352px;
  display: flex;
  flex-direction: column;
  /* background-color: ${props => props.theme.containerBackground}; */
  div.participants-profile__profile-picture {
    position: relative;
    height: 60%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    div.participants-profile__profile-picture_gradient {
      position: absolute;
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
    align-items: flex-start;
    padding: 20px;
    h3 {
      font-size: 0.9rem;
      font-weight: 400;
      margin-bottom: 5px;
    }
    p {
      font-size: 0.9rem;
      font-weight: 400;
      color: ${props => props.theme.secondaryText};
      margin-bottom: 15px;
      i {
        margin-right: 5px;
      }
    }
    a {
      justify-self: flex-end;
      font-size: 0.8rem;
      font-weight: 400;
      color: ${props => props.theme.purple};
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export const PartnerStatus = styled.div<isOnlineProp>`
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
