import styled from 'styled-components';

export const DiscoverFriendModalContainer = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 500;
  background-color: rgba(0, 0, 0, 0.5);
  div.discover-friend-modal-inner {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: baseline;
    color: ${props => props.theme.primaryText};
    position: relative;
    width: 355px;
    height: 367px;
    background-color: ${props => props.theme.containerBackground};
    box-shadow: 0 4px 10px 0px ${props => props.theme.shadow};
    border-radius: 10px;
    padding: 20px;

    i.fa-search {
      position: absolute;
      top: 30px;
      left: 30px;
    }
    input {
      border: 4px solid transparent;
      outline: none;
      width: 100%;
      height: 35px;
      min-height: 35px;
      font-size: 1.1rem;
      padding: 1px 0 0 30px;
      border-radius: 10px;
      background-color: ${props => props.theme.background};
      color: ${props => props.theme.primaryText};
      transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
      &:focus {
        border: 3px solid ${props => props.theme.buttonBackgroundA};
        border-radius: 4px;
        outline: none;
      }
    }
    section.discover-friend-modal-inner__result {
      flex: 1 1 auto;
      width: 100%;
      position: relative;
      border-radius: 10px;
      background-color: ${props => props.theme.background};
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
      div.discover-friend-modal-inner__no-results {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8rem;
        color: ${props => props.theme.secondaryText};
      }
      div.discover-friend-modal-inner__result-wrapper {
        flex-wrap: wrap;
        display: flex;
        width: 100%;
        padding: 10px 10px 0;
      }
    }
    div.close-button {
      position: absolute;
      top: -20px;
      right: 0px;
      width: 1rem;
      height: 1rem;
      i.fa-times {
        cursor: pointer;
      }
    }
  }
`;
