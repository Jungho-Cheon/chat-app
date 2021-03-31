import styled from 'styled-components';

export const MessageListContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 300px 1fr;
  padding-top: 20px;
  max-height: 100%;
`;

export const MessageListUpperContainer = styled.div`
  width: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  div.message-list__title-container {
    width: 100%;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 25px;
    h3 {
      font-size: 1.5rem;
      font-weight: 700;
      color: ${props => props.theme.primaryText};
    }
    
  }
`;

export const LogoImage = styled.img`
  width: 100px;
  height: 50px;
  object-fit: cover;
  cursor: pointer;
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  height: 35px;
  i {
    position: absolute;
    top: 10px;
    left: 10px;
    translate: transform(-50%, -50%);
    color: ${props => props.theme.primaryText};
  }
`;
export const SearchInput = styled.input`
  border: 4px solid transparent;
  outline: none;
  width: 100%;
  height: 35px;
  font-size: 1.1rem;
  padding: 1px 0 0 30px;
  border-radius: 10px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.primaryText};
  transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  &:focus {
    border: 4px solid ${props => props.theme.buttonBackgroundA};
    border-radius: 4px;
    outline: none;
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: 10px 0;
  background-color: ${props => props.theme.divider};
`;

export const MessageCardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 50px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: ${props => props.theme.secondaryText};
      border-radius: 50px;
    }
  }

  div.message-not-found {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    p {
      color: ${props => props.theme.secondaryText};
      font-size: 0.7rem;
      font-weight: 700;
      margin-bottom: 5px;
      &:nth-child(2) {
        margin-bottom: 45px;
      }
    }
    div.message-not-found__discover-user-button {
      width: 70%;
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: ${props => props.theme.containerBackground};
      color: ${props => props.theme.secondaryText};
      /* font-size: 0.8rem; */
      font-weight: 700;
      border-radius: 5px;
      transition: 0.2s cubic-bezier(0.19, 1, 0.22, 1);
      cursor: pointer;
      &:hover {
        background-color: ${props => props.theme.buttonHoveredB};
        color: ${props => props.theme.background};
        box-shadow: 0 5px 10px 1px rgba(0, 0, 0, 0.2);
      }
      &:active {
        color: white;
        background-color: ${props => props.theme.buttonActiveB};
      }
    }
  }
`;
