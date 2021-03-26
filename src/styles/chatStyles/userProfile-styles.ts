import styled from 'styled-components';

export const UserProfileContainer = styled.div`
  background-color: ${props => props.theme.containerBackground};
  border: 1px solid ${props => props.theme.containerBorder};
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin-left: 20px;
`;

export const UserProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px 0;
  width: 100%;
  span.userprofile__email {
    font-size: 0.8rem;
    color: ${props => props.theme.secondaryText};
    margin-bottom: 10px;
  }
  span.userprofile__description {
    font-size: 0.8rem;
    color: ${props => props.theme.primaryText};
    margin-bottom: 10px;
  }
  div.userprofile__setting-button {
    width: 80%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.mainBackground};
    border: 1px solid ${props => props.theme.divider};
    font-size: 0.8rem;
    font-weight: 700;
    border-radius: 5px;
    transition: 1s cubic-bezier(0.19, 1, 0.22, 1);
    cursor: pointer;

    &:hover {
      background-color: ${props => props.theme.hoveredButton};
    }
  }
`;

export const UserNameContainer = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${props => props.theme.primaryText};
  margin-bottom: 10px;
  i {
    font-size: 0.9rem;
  }
`;
