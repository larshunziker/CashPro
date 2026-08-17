import React, { FC, ReactElement } from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../common/components/Link';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { FooterInnerProps } from './typings';

const FooterInner: FC<FooterInnerProps> = ({ footerPrimaryMenu }) => {
  if (
    !Array.isArray(footerPrimaryMenu?.links?.edges) ||
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    footerPrimaryMenu?.links?.edges.length < 1
  ) {
    return null;
  }

  return (
    <>
      {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
      {footerPrimaryMenu.links.edges.map(
        (menuGraphListItem: MenuTreeItemEdge): ReactElement => (
          <section
            key={`footer-menu-${menuGraphListItem?.node?.id}`}
            className={classNames(
              grid.ColSm6,
              styles.FooterNavigation,
              grid.HideForPrint,
            )}
          >
            {menuGraphListItem?.node?.link && (
              <div className={styles.Title}>
                {menuGraphListItem.node?.link?.label}
              </div>
            )}
            {menuGraphListItem?.node?.subtree?.edges && (
              <ul
                className={classNames(styles.List, styles.FooterNavigationList)}
              >
                {menuGraphListItem.node.subtree.edges.map(
                  (menuGraphListItem: MenuTreeItemEdge): ReactElement => {
                    if (!menuGraphListItem?.node?.link?.label) {
                      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
                      return null;
                    }

                    return (
                      <li
                        className={styles.ListItem}
                        key={`footer-menu-item${menuGraphListItem?.node?.id}`}
                      >
                        {/* @ts-ignore TODO: TS2322 ->  Type '{ className */}
                        <Link
                          {...menuGraphListItem?.node?.link}
                          className={styles.Link}
                          nofollow
                        />
                      </li>
                    );
                  },
                )}
              </ul>
            )}
          </section>
        ),
      )}
    </>
  );
};

export default FooterInner;
