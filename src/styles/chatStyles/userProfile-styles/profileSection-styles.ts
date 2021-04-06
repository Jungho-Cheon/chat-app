import styled from 'styled-components';

export const ProfileSectionContianer = styled.section`
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
    width: 100px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    border: 1px solid ${props => props.theme.primaryText};
    cursor: pointer;
    transition: 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
    color: ${props => props.theme.primaryText};
    &:hover {
      border: 1px solid ${props => props.theme.buttonBackgroundA};
      background-color: ${props => props.theme.buttonBackgroundA};
      color: ${props => props.theme.primaryText};
    }
    &:active {
      border: 1px solid ${props => props.theme.primaryText};
    }
    p {
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
    }
  }

`;

export const UserNameContainer = styled.div`
  width: 200px;
  height: 1.6rem;
  font-size: 1.5rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  color: ${props => props.theme.primaryText};
  margin-bottom: 10px;
`;
