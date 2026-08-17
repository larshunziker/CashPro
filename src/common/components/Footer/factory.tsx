import React, { FC, ReactElement, useState } from 'react';
import classNames from 'classnames';
import Link from '../Link';
import { TRACKING_CLASS_SITE_FOOTER } from '../../../shared/constants/tracking';
import grid from '../../assets/styles/grid.legacy.css';
import { FooterFactoryOptions, FooterProps } from './typings';

const FooterFactory = ({
  Logo,
  Icon,
  SocialMediaBar,
  FooterInner,
  FOOTER_ID = 'footer',
  styles,
  raschLabel = 'Ringier AG | Ringier Medien Schweiz',
  morePublicationsLabel = 'weitere Publikationen',
}: FooterFactoryOptions) => {
  const Footer: FC<FooterProps> = (props) => {
    const {
      footerPrimaryMenu,
      footerPrimaryMenuFr,
      publicationsMenu,
      publication = '',
      isMarketingPage = false,
    } = props;
    const [isPublicationVisible, setIsPublicationVisible] = useState(false);

    return (
      <footer
        className={classNames(TRACKING_CLASS_SITE_FOOTER, styles.Wrapper, {
          [grid.GridCentered]: isMarketingPage,
        })}
        id={FOOTER_ID}
        data-testid="footer-wrapper"
      >
        <div
          className={classNames(
            grid.Container,
            styles.MenuSection,
            grid.HideForPrint,
          )}
        >
          <div className={grid.Row}>
            <div className={classNames(grid.ColXs24)}>
              <div className={styles.FooterHeader}>
                <div className={grid.Row}>
                  <div className={classNames(grid.ColSm12, styles.LogoWrapper)}>
                    <Logo publication={publication} />
                  </div>
                  <div
                    className={classNames(
                      grid.ColSm12,
                      styles.SocialMediaBarWrapper,
                    )}
                  >
                    <SocialMediaBar publication={publication} />
                  </div>
                </div>
              </div>
            </div>
            <FooterInner
              footerPrimaryMenu={footerPrimaryMenu}
              footerPrimaryMenuFr={footerPrimaryMenuFr}
            />
          </div>
        </div>

        <div className={styles.PublicationSection}>
          <div className={grid.Container}>
            <div
              className={classNames(grid.Row, styles.PublicationCollapseHeader)}
            >
              <div
                className={classNames(
                  grid.ColSm12,
                  styles.PublicationCollapseHeaderCol,
                )}
              >
                <span className={styles.Disclaimer}>{raschLabel}</span>
              </div>
              <div
                className={classNames(
                  grid.ColSm12,
                  styles.CollapseToggleWrapper,
                  styles.PublicationCollapseHeaderCol,
                  grid.HideForPrint,
                )}
              >
                <button
                  className={classNames(styles.PublicationToggle, {
                    [styles.Open]: isPublicationVisible,
                  })}
                  onClick={() => setIsPublicationVisible(!isPublicationVisible)}
                  data-testid="footer-toggle-publications"
                >
                  <div
                    className={styles.PublicationToggleIsOpen}
                    data-testid="footer-more-publications"
                  >
                    <span>
                      {Array.isArray(publicationsMenu?.links?.edges) &&
                        /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
                        publicationsMenu?.links?.edges?.length > 0 &&
                        publicationsMenu?.links?.edges?.length}{' '}
                      {morePublicationsLabel}
                    </span>
                    <Icon
                      type="IconChevronDown"
                      addClass={classNames(styles.ExpansionIcon, {
                        [styles.ExpansionIconOpen]: isPublicationVisible,
                      })}
                    />
                  </div>
                </button>
              </div>
            </div>
            <div
              className={classNames(grid.Row, styles.PublicationCollapseBody, {
                [styles.PublicationCollapseBodyIsOpen]: isPublicationVisible,
              })}
              aria-hidden={!isPublicationVisible}
            >
              {publicationsMenu?.links?.edges &&
                Array.isArray(publicationsMenu?.links?.edges) &&
                publicationsMenu?.links?.edges?.length > 0 && (
                  <div
                    className={grid.ColXs24}
                    data-testid="footer-publications-menu"
                  >
                    <ul className={styles.PublicationList}>
                      {publicationsMenu.links.edges.map(
                        (menuItem: MenuTreeItemEdge): ReactElement => {
                          if (!menuItem?.node?.link?.label) {
                            /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
                            return null;
                          }

                          return (
                            <li
                              className={styles.ListItem}
                              key={`footer-menu-item${menuItem?.node?.id}`}
                            >
                              <Link
                                className={styles.Link}
                                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
                                path={menuItem?.node?.link?.path}
                                label={menuItem?.node?.link?.label}
                                nofollow
                              />
                            </li>
                          );
                        },
                      )}
                    </ul>
                  </div>
                )}
            </div>
          </div>
        </div>
      </footer>
    );
  };

  return Footer;
};

export default FooterFactory;
