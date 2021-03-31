import React from 'react';

import { MenuButtonContainer } from './menuButton-styles';

interface MenuButtonProps {
  iconClass: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const MenuButton = ({ iconClass, onClick }: MenuButtonProps): JSX.Element => {
  return (
    <MenuButtonContainer onClick={onClick}>
      <i className={'fas ' + iconClass} />
    </MenuButtonContainer>
  );
};
//fas fa-chevron-right
export default MenuButton;
