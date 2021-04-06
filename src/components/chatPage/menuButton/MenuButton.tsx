import React from 'react';

import { MenuButtonContainer } from './menuButton-styles';

interface MenuButtonProps {
  iconClass: string;
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  hasNewNotification?: boolean;
  hoverMessage?: string;
}

const MenuButton = ({
  iconClass,
  onClick,
  hasNewNotification,
  hoverMessage,
}: MenuButtonProps): JSX.Element => {
  return (
    <MenuButtonContainer onClick={onClick}>
      <i className={iconClass} />
      {hasNewNotification && <div className="dot" />}
      {hoverMessage && <p>{hoverMessage}</p>}
    </MenuButtonContainer>
  );
};
//fas fa-chevron-right
export default MenuButton;
