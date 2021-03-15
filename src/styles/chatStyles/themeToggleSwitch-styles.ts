import styled from 'styled-components';

interface themeToggleSwitchProps {
  isToggled: boolean;
}

export const ThemeToggleSwitchContainer = styled.div<themeToggleSwitchProps>`
  label {
    width: 50px;
    height: 26px;
    display: flex;
    position: relative;
    background: rgb(39, 40, 135);
    border-radius: 50px;
    padding: 3px;
    .sun {
      width: 20px;
      height: 20px;
      margin-right: 3px;
    }
    .moon {
      width: 20px;
      height: 20px;
    }
    .ball {
      width: 21px;
      height: 21px;
      background: white;
      border-radius: 50%;
      position: absolute;
      transition: 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
      left: ${props => (props.isToggled ? `26px` : `3px`)};
    }
  }
`;
