import React from 'react';
import NavigationItem from './components/NavigationItem';
import styles from './styles.legacy.css';
import { SecondaryMenuProps } from './typings';

const SecondaryMenu = ({ menu, closeNavigation }: SecondaryMenuProps) => {
  const items = menu.links?.edges || [];

  if (!items.length) {
    return null;
  }

  return (
    <nav
      data-testid="secondary-navigation-menu-navigation-wrapper"
      className={styles.Wrapper}
    >
      <ul className={styles.Navigation}>
        {/* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<MenuTreeItemEdge>'. */}
        {items.map(({ node }, itemIndex) => (
          <NavigationItem
            key={`secondary-navigation-item-${node.id}`}
            {...node}
            closeNavigation={closeNavigation}
            itemIndex={itemIndex}
          />
        ))}
      </ul>
    </nav>
  );
};

export default SecondaryMenu;
