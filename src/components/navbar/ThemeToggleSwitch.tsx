import React from 'react';

// styled components
import { ThemeToggleSwitchContainer } from '../../styles/themeToggleSwitch-styles';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTheme, toggleTheme } from '../../features/theme/themeSlice';

const ThemeToggleSwitch = (): JSX.Element => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(getCurrentTheme);
  const switchTheme = () => {
    console.log('switch theme!');
    dispatch(toggleTheme());
  };
  return (
    <ThemeToggleSwitchContainer onClick={switchTheme} isToggled={currentTheme}>
      <label>
        <img className="sun" src="assets/sun.svg" alt="sun" />
        <img className="moon" src="assets/moon.svg" alt="moon" />
        <div className="ball"></div>
      </label>
    </ThemeToggleSwitchContainer>
  );
};

export default ThemeToggleSwitch;
