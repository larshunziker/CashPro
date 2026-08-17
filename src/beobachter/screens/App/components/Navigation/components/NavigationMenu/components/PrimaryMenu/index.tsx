import React, { ReactElement } from 'react';
import SubMenuList from './components/SubMenuList';
import styles from './styles.legacy.css';
import { PrimaryMenuProps } from './typings';

const PrimaryMenu = ({
  menu,
  closeNavigation,
}: PrimaryMenuProps): ReactElement | null => {
  if (
    !((menu?.links?.edges?.length || 0) > 0) ||
    !Array.isArray(menu.links?.edges)
  ) {
    return null;
  }

  return (
    <nav
      className={styles.Wrapper}
      data-testid="primary-navigation-menu-navigation-wrapper"
    >
      <ul className={styles.Navigation}>
        <SubMenuList
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<MenuTreeItemEdge>[] | undefined' is not assignable to type 'MenuTreeItemEdge[]'. */
          items={menu.links?.edges}
          closeNavigation={closeNavigation}
        />
      </ul>
    </nav>
  );
};

export default PrimaryMenu;
