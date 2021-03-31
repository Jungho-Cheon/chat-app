import React from 'react';

import { MenuButtonContainer } from './menuButton-styles';

interface MenuButtonProps {
  iconClass: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  hasNewNotification?: boolean;
}

const MenuButton = ({
  iconClass,
  onClick,
  hasNewNotification,
}: MenuButtonProps): JSX.Element => {
  return (
    <MenuButtonContainer onClick={onClick}>
      <i className={'fas ' + iconClass} />
      {hasNewNotification && <div className="dot" />}
    </MenuButtonContainer>
  );
};
//fas fa-chevron-right
export default MenuButton;
