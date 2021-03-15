import React from 'react';
import { useDispatch } from 'react-redux';
import { clearChatRoom } from '../../../features/chatData/chatDataSlice';

// styled-components
import {
  NavbarContainer,
  NavbarIcon,
  ThemeToggleSwitchContainer,
} from '../../../styles/chatStyles/navbar-styles';

// component
import ThemeToggleSwitch from './ThemeToggleSwitch';

const Navbar = (): JSX.Element => {
  const dispatch = useDispatch();
  return (
    <NavbarContainer>
      <NavbarIcon>
        <i className="fas fa-stream"></i>
      </NavbarIcon>

      {/* Home */}
      <NavbarIcon onClick={() => dispatch(clearChatRoom())}>
        <i className="fas fa-home"></i>
      </NavbarIcon>
      <NavbarIcon>
        <i className="fas fa-chart-bar"></i>
      </NavbarIcon>
      <NavbarIcon>
        <i className="far fa-folder"></i>
      </NavbarIcon>
      <NavbarIcon>
        <i className="far fa-comment"></i>
      </NavbarIcon>
      <NavbarIcon>
        <i className="fas fa-cog"></i>
      </NavbarIcon>
      <ThemeToggleSwitchContainer>
        <ThemeToggleSwitch />
      </ThemeToggleSwitchContainer>
    </NavbarContainer>
  );
};

export default Navbar;
