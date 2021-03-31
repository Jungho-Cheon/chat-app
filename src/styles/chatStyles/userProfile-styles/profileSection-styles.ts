import styled from 'styled-components';

export const ProfileSectionContianer = styled.section`
  position: relative;
  height: 100%;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  header {
    width: 100%;
    height: 60px;
    min-height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 20px;
  }
`;

export const UserProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 20px 0;
  width: 100%;
  span.userprofile__email {
    font-size: 0.9rem;
    color: ${props => props.theme.secondaryText};
    margin-bottom: 10px;
    white-space: nowrap;
    text-align: center;
    text-overflow: ellipsis;
  }
  span.userprofile__description {
    display: -webkit-box;
    font-size: 0.8rem;
    color: ${props => props.theme.primaryText};
    margin-bottom: 10px;
    width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    -webkit-line-clamp: 3; /* 라인수 */
    -webkit-box-orient: vertical;
    line-height: 15px; //for not webkit browser
    max-height: 45px;
  }
  div.userprofile__setting-button {
    width: 80%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.buttonBackgroundA};
    border: 1px solid ${props => props.theme.divider};
    border-radius: 5px;
    font-size: 0.9rem;
    font-weight: 700;
    color: ${props => props.theme.primaryText};
    transition: 1s cubic-bezier(0.19, 1, 0.22, 1);
    cursor: pointer;

    &:hover {
      background-color: ${props => props.theme.buttonHoveredA};
    }
    &:active {
      background-color: ${props => props.theme.buttonActiveA};
    }
  }
`;

export const UserNameContainer = styled.div`
  width: 200px;
  font-size: 1.5rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  color: ${props => props.theme.primaryText};
  margin-bottom: 10px;
`;
