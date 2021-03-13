import styled from 'styled-components';

export const MessageListContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 180px 1fr;
  max-height: 100%;
`;

export const MessageListUpperContainer = styled.div`
  margin-top: 20px;
  height: 150px;
  padding: 0 0 0 40px;
`;

export const LogoContainer = styled.div`
  margin-right: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoImage = styled.img`
  width: 100px;
  height: 50px;
  object-fit: cover;
  cursor: pointer;
`;

export const SortButton = styled.div`
  display: flex;
  align-items: flex-end;
  color: ${props => props.theme.secondaryText};
  cursor: pointer;
`;
export const SortIcon = styled.div`
  i {
    font-size: 1.2rem;
    padding-bottom: 3px;
    padding-right: 10px;
  }
`;
export const SortText = styled.span`
  font-weight: 600;
  margin-top: 15px;
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  height: 35px;
  margin: 30px 0 10px;
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
  width: calc(100% - 26px);
  height: 35px;
  font-size: 1.1rem;
  padding: 1px 0 0 30px;
  border-radius: 10px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.primaryText};
  transition: 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  &:focus {
    border: 4px solid ${props => props.theme.purple};
    border-radius: 4px;
    outline: none;
  }
`;

export const Divider = styled.div`
  width: calc(100% - 25px);
  height: 1px;
  margin: 20px 0;
  background-color: ${props => props.theme.divider};
`;

export const MessageCardsContainer = styled.div`
  height: calc(100vh - 210px);
  padding: 0 20px 0 40px;
  overflow-y: auto;
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
`;
