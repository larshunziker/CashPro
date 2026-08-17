import React, { FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import authStateSelector from '../../../../../../../shared/selectors/authStateSelector';
import Link from '../../../../../../../common/components/Link';
import { Auth0 } from '../../../../../../../common/components/Auth0Provider';
import { useSSRContext } from '../../../../../../../common/components/SSRContext';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { FooterInnerProps } from './typings';
import { getServiceUrl } from '../../../../../../../shared/helpers/serviceUrl';

export type FooterInnerPropsInner = FooterInnerProps & {
  isAuthenticated: boolean;
};

const FooterInner: FC<FooterInnerPropsInner> = ({
  footerPrimaryMenu,
  isAuthenticated,
}) => {
  const { isSSR } = useSSRContext();

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
              grid.ColSm12,
              styles.FooterNavigation,
              grid.HideForPrint,
            )}
          >
            {menuGraphListItem?.node?.link && (
              <div className={styles.Title}>
                {menuGraphListItem.node?.link?.label}
              </div>
            )}
            {Array.isArray(menuGraphListItem?.node?.subtree?.edges) &&
              /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
              menuGraphListItem?.node?.subtree?.edges.length > 0 && (
                <ul
                  className={classNames(
                    styles.List,
                    styles.FooterNavigationList,
                  )}
                >
                  {menuGraphListItem.node?.link?.label === 'Services' && (
                    <li
                      className={styles.ListItem}
                      key={`default-footer-ringier-connect-item`}
                      data-testid="footer-inner-ringier-connect-item"
                    >
                      {(!isSSR &&
                        (!isAuthenticated ? (
                          <button
                            className={styles.LinkButton}
                            data-testid="footer-inner-auth-button"
                            onClick={() => Auth0.login()}
                          >
                            Anmelden
                          </button>
                        ) : (
                          <Link
                            path={`${getServiceUrl(__AUTH_SERVICE_URL__)}/profile?lang=de`}
                            className={styles.Link}
                            label="Mein Profil"
                          />
                        ))) || <span className={styles.Link}>Anmelden</span>}
                    </li>
                  )}
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

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  isAuthenticated: authStateSelector(state).isAuthenticated,
});

export default connect(mapStateToProps)(FooterInner);
