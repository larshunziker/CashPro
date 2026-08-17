import React, { ReactNode, memo } from 'react';
import classNames from 'classnames';
import SVGIcon from '../../../SVGIcon';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';

type IconButtonProps = {
  addClass?: string;
  children: ReactNode;
  onClick?: () => void;
  type: string;
};

const IconButton = ({ type, onClick, children, addClass }: IconButtonProps) => {
  return (
    <button className={classNames(grid.HiddenSmUp, addClass)} onClick={onClick}>
      <SVGIcon type={type} />
      {children}
    </button>
  );
};

export default memo(IconButton);
