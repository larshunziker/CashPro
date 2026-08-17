import React, { ComponentType } from 'react';
import ExpansionPanelSubMenu from '../ExpansionPanelSubMenu';
import MenuItem from '../MenuItem';
import styles from './styles.legacy.css';
import { SubMenuListProps } from './typings';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [styles.ThemeDark];

type SubMenuListPropsInner = SubMenuListProps;

const SubMenuList: ComponentType<SubMenuListProps> = ({
  items,
  closeNavigation,
  theme,
}: SubMenuListPropsInner) => {
  if (!items || !items.length) {
    return null;
  }

  return (
    <>
      {items.map(({ node }, categoryIndex) => {
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<MenuTreeItemEdge>[]' is not assignable to type 'MenuTreeItemEdge[]'. */
        const subItems: MenuTreeItemEdge[] = node?.subtree?.edges || [];
        const hasSubtree = subItems.length > 0;

        return (
          <li
            key={`submenulist-item-${node?.id}`}
            className={styles.SubMenuWrapper}
            data-testid="navigation-menu-mobile-submenu"
          >
            {hasSubtree ? (
              <ExpansionPanelSubMenu
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                title={node?.link?.label}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                path={node?.link?.path}
                theme={theme}
                ariaLabel="Submenü togglen"
                onLinkClick={closeNavigation}
                isHeaderLinkClickable
              >
                <ul>
                  <SubMenuList
                    items={subItems}
                    closeNavigation={closeNavigation}
                    theme={theme}
                  />
                </ul>
              </ExpansionPanelSubMenu>
            ) : (
              /* @ts-ignore TODO: TS2322 ->  Type '{ closeNavigation */
              <MenuItem
                key={`submenulist-link-item-${node?.id}`}
                {...node}
                closeNavigation={closeNavigation}
                categoryIndex={categoryIndex}
                subcategoryIndex={0}
                theme={theme}
                isNavHeader
                addClass={styles.MenuItem}
              />
            )}
          </li>
        );
      })}
    </>
  );
};

export default SubMenuList;
