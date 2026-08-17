import React from 'react';
import Link from '../../../../../../../../../common/components/Link';
import styles from './styles.legacy.css';
import { MenuLinkItemProps } from './typings';

const MenuLinkItem = ({ node, closeNavigation }: MenuLinkItemProps) => {
  if (!node?.link) {
    return null;
  }

  return (
    <div className={styles.LinkWrapper} data-testid="menu-link-item-wrapper">
      {/* @ts-ignore TODO: TS2322 ->  Type '{ className */}
      <Link
        {...node.link}
        className={styles.NavLink}
        onClick={closeNavigation}
      />
    </div>
  );
};

export default MenuLinkItem;
