import React from 'react';

// styled-components
import {
  NavbarContainer,
  NavbarIcon,
} from '../styles/navbar-styles';

const Navbar = (): JSX.Element => {
  return (
    <NavbarContainer>
      <NavbarIcon>
        <i className="fas fa-stream"></i>
      </NavbarIcon>

      <NavbarIcon>
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
    </NavbarContainer>
  );
};

export default Navbar;
