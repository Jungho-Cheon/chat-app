import styled from 'styled-components'

export const FriendSectionContianer = styled.section`
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  header {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    width: 100%;
    height: 60px;
    min-height: 60px;
    background-color: ${props => props.theme.navbarBackground};
    h3 {
      color: ${props => props.theme.primaryText};
      font-size: 1.5rem;
      font-weight: 700;
    }
  }
  section.user-profile__friend-card-container {
    flex: 1 1 auto;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 5px;
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
  }
`;