import React from 'react';
import Link from '../../../../../../../../../common/components/Link';
import SocialMediaBar from '../../../../../SocialMediaBar';
import styles from './styles.legacy.css';

const QuickAccessNavigation = ({ menu }: { menu: Menu }) => {
  const items = menu.links?.edges || [];

  return (
    <div className={styles.ServiceNavigationWrapper}>
      <h2 className={styles.ServiceNavigationTitle}>Schnellzugriff</h2>

      <ul
        className={styles.ServiceNavigationList}
        data-testid="service-navigation-links-list"
      >
        {/* @ts-ignore TODO: TS2339 ->  Property 'node' does not exist on type 'Maybe<MenuTreeItemEdge>'. */}
        {items.map(({ node: menuItem }) => (
          <li
            key={menuItem.link.label}
            className={styles.ServiceNavigationItem}
          >
            <Link
              path={menuItem.link.path}
              className={styles.ServiceNavigationLink}
              nofollow
            >
              {menuItem.link.label}
            </Link>
          </li>
        ))}
      </ul>
      <SocialMediaBar isDark={true} />
    </div>
  );
};

export default QuickAccessNavigation;
