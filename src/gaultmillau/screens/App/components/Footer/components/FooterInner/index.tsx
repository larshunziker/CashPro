import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import Link from '../../../../../../../common/components/LinkLegacy';
import { DEFAULT_LANGUAGE } from '../../../Navigation/components/LanguageSwitch';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { FooterInnerProps } from './typings';

const FooterInner: FC<FooterInnerProps> = ({
  footerPrimaryMenu,
  footerPrimaryMenuFr,
}) => {
  const language = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => settingsStateSelector(state).language,
  );
  const primaryMenu =
    language === DEFAULT_LANGUAGE ? footerPrimaryMenu : footerPrimaryMenuFr;

  if (
    !Array.isArray(primaryMenu?.links?.edges) ||
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    primaryMenu?.links?.edges.length < 1
  ) {
    return null;
  }

  return (
    <>
      {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
      {primaryMenu.links.edges.map(
        (menuGraphListItem: MenuTreeItemEdge): ReactElement => (
          <section
            key={`footer-menu-${menuGraphListItem?.node?.id}`}
            className={classNames(grid.ColSm12, styles.FooterNavigation)}
          >
            {Array.isArray(menuGraphListItem?.node?.subtree?.edges) &&
              /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
              menuGraphListItem?.node?.subtree?.edges.length > 0 && (
                <ul className={styles.FooterNavigationList}>
                  {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
                  {/* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */}
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
                          <Link
                            link={menuGraphListItem?.node?.link}
                            className={styles.Link}
                            nofollow
                          >
                            {menuGraphListItem?.node?.link?.label}
                          </Link>
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
