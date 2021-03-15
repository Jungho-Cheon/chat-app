import styled from 'styled-components';

export const NavbarContainer = styled.div`
  background-color: ${props => props.theme.purple};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const NavbarIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.2);
  transition: 0.2s cubic-bezier(0.215, 0.61, 0.355, 1);
  cursor: pointer;
  &:nth-child(1) {
    color: white;
    margin-bottom: 100px;
  }
  &:nth-child(n + 2):hover {
    color: white;
    border-left: 4px solid white;
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const ThemeToggleSwitchContainer = styled.div`
  position: absolute;
  bottom: 20px;
`;
