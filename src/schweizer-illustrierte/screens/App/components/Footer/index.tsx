import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withProps from 'recompose/withProps';
import classNames from 'classnames';
import isStyleDesignByChannel from '../../../../shared/helpers/isStyleDesignByChannel';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import Link from '../../../../../common/components/Link';
import Icon from '../Icon';
import { TRACKING_CLASS_SITE_FOOTER } from '../../../../../shared/constants/tracking';
import { SOCIAL_MEDIA_LINK_GOOGLE_NEWS } from '../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries.preload'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illus */
import { query } from './queries.preload';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ActiveMainChannel } from '../../../../shared/types';
import { FooterProps } from './typings';

type SocialOptions = {
  name: string;
  link: string;
  iconType: string;
};

type FooterPropsInner = FooterProps & {
  menuByName: Menu;
  activeMainChannel: ActiveMainChannel;
};

export const socials: Array<SocialOptions> = [
  {
    name: 'Facebook',
    link: 'https://www.facebook.com/SchweizerIllustrierte',
    iconType: 'IconFacebook',
  },
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/schweizer_illustrierte',
    iconType: 'IconInstagram',
  },
  {
    name: 'Google News',
    link: SOCIAL_MEDIA_LINK_GOOGLE_NEWS,
    iconType: 'IconGoogleNews',
  },
];

export const socialsSY: Array<SocialOptions> = [
  {
    name: 'Facebook',
    link: 'https://www.facebook.com/stylemagazinch/',
    iconType: 'IconFacebook',
  },
  {
    name: 'Instagram',
    link: 'https://www.instagram.com/stylemagazin_ch/',
    iconType: 'IconInstagram',
  },
  {
    name: 'Pinterest',
    link: 'https://www.pinterest.ch/stylemagazin_ch/',
    iconType: 'IconPinterest',
  },
];

type SocialLinksProps = { channel: ActiveMainChannel };

const SocialLinks = ({ channel }: SocialLinksProps) => {
  let socialItems: Array<SocialOptions> = socials;

  if (isStyleDesignByChannel(channel)) {
    socialItems = socialsSY;
  }

  return (
    <>
      {socialItems.map(({ name, link, iconType }) => (
        <li key={`footer-social-item-${name}`} className={styles.ListItem}>
          <Link
            className={styles.SocialLink}
            path={link}
            title={name}
            ariaLabel={name}
          >
            <Icon type={iconType} addClass={styles.Share} aria-hidden={true} />
          </Link>
        </li>
      ))}
    </>
  );
};

class Footer extends React.Component<FooterPropsInner> {
  render() {
    const {
      addClass = '',
      activeMainChannel,
      menuByName,
      isMarketingPageReducedHeader,
    } = this.props;
    return (
      <footer
        className={classNames(
          TRACKING_CLASS_SITE_FOOTER,
          styles.Wrapper,
          grid.HideForPrint,
          {
            [styles.SY]: isStyleDesignByChannel(activeMainChannel),
            [addClass]: !!addClass,
            [grid.GridCentered]: isMarketingPageReducedHeader,
          },
        )}
      >
        <div className={grid.Container}>
          <div className={styles.Section}>
            <div className={styles.InnerWrapper}>
              <div className={styles.NavigationWrapper}>
                {menuByName?.links?.edges &&
                  Array.isArray(menuByName.links.edges) &&
                  menuByName.links.edges.length > 0 && (
                    <nav data-testid="footer-navigation-items-wrapper">
                      <ul className={styles.List}>
                        {menuByName.links.edges.map(
                          /* @ts-ignore TODO: TS2339 ->  Property 'id' does not exist on type 'Maybe<MenuTreeItem>'. */
                          /* @ts-ignore TODO: TS2339 ->  Property 'link' does not exist on type 'Maybe<MenuTreeItem>'. */
                          ({ node: { id, link } = {} }: MenuTreeItemEdge) => (
                            <li
                              key={`footer-menu-item-${
                                id || link?.path || link?.label
                              }`}
                              className={styles.ListItem}
                            >
                              <Link {...link} className={styles.Link} />
                            </li>
                          ),
                        )}
                      </ul>
                    </nav>
                  )}
              </div>
              <div className={styles.CopyMobile} data-testid="footer-copyright">
                &copy; {new Date().getFullYear()} Schweizer Illustrierte
              </div>
              <div className={styles.Share}>
                <ul
                  className={styles.List}
                  data-testid="footer-socials-wrapper"
                >
                  <SocialLinks channel={activeMainChannel} />
                </ul>
              </div>
              <div className={styles.Logo}>
                <div className={styles.Copy}>
                  &copy; {new Date().getFullYear()} Schweizer Illustrierte
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

const withData = withProps(query);

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default compose<any, any>(connect(mapStateToProps), withData)(Footer);
