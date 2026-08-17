import React, { ReactElement } from 'react';
import classNames from 'classnames';
import socialMediaBarFactory from '../../../../../common/components/SocialMediaBar/factory';
import Link from '../../../../../common/components/Link';
import IconFacebookAlt from '../../../../../common/components/SVGIcon/components/SocialFacebookAlt';
import IconGoogleNews from '../../../../../common/components/SVGIcon/components/SocialGoogleNews';
import IconInstagram from '../../../../../common/components/SVGIcon/components/SocialInstagram';
import IconLinkedin from '../../../../../common/components/SVGIcon/components/SocialLinkedin';
import IconTikTok from '../../../../../common/components/SVGIcon/components/SocialTikTok';
import IconTwitter from '../../../../../common/components/SVGIcon/components/SocialTwitter';
import {
  SOCIAL_MEDIA_LINK_FACEBOOK,
  SOCIAL_MEDIA_LINK_GOOGLE_NEWS,
  SOCIAL_MEDIA_LINK_INSTAGRAM,
  SOCIAL_MEDIA_LINK_LINKEDIN,
  SOCIAL_MEDIA_LINK_TIKTOK,
  SOCIAL_MEDIA_LINK_TWITTER,
} from '../../constants';
import { SOCIAL_MEDIA_BAR_ORIGIN_NAVIGATION } from './constants';
import styles from './styles.legacy.css';
import {
  SocialMediaBarFactoryOptionsStyles,
  SocialMediaBarIconProps,
  SocialMediaBarProps,
} from '../../../../../common/components/SocialMediaBar/typings';

const socialMediaItems: Array<SocialMediaBarIconProps> = [
  {
    type: 'Facebook',
    component: <IconFacebookAlt />,
    link: SOCIAL_MEDIA_LINK_FACEBOOK,
  },
  {
    type: 'Instagram',
    component: <IconInstagram />,
    link: SOCIAL_MEDIA_LINK_INSTAGRAM,
  },
  {
    type: 'Linkedin',
    component: <IconLinkedin />,
    link: SOCIAL_MEDIA_LINK_LINKEDIN,
  },
  {
    type: 'Twitter',
    component: <IconTwitter />,
    link: SOCIAL_MEDIA_LINK_TWITTER,
  },
  {
    type: 'TikTok',
    component: <IconTikTok />,
    link: SOCIAL_MEDIA_LINK_TIKTOK,
  },
  {
    type: 'Google News',
    component: <IconGoogleNews />,
    link: SOCIAL_MEDIA_LINK_GOOGLE_NEWS,
  },
];

const SocialMediaBarIcon = ({
  type,
  link,
  component,
  isDark,
}: SocialMediaBarIconProps): ReactElement => (
  <Link
    path={link}
    className={styles.Link}
    target="_blank"
    onClick={(event) => event.stopPropagation()}
    title={`beobachter on ${type}`}
    ariaLabel={`beobachter on ${type}`}
  >
    <div
      className={classNames(styles.Content, styles.Icon, {
        [styles.DarkIcon]: isDark,
      })}
    >
      {component}
    </div>
  </Link>
);

const getStylesByProps = ({
  origin = '',
}: SocialMediaBarProps): SocialMediaBarFactoryOptionsStyles => ({
  Wrapper: classNames(styles.Wrapper, {
    [styles.NavigationWrapper]: origin === SOCIAL_MEDIA_BAR_ORIGIN_NAVIGATION,
  }),
});

const SocialMediaBar = socialMediaBarFactory({
  socialMediaItems,
  SocialMediaBarIcon,
  styles: getStylesByProps,
});

export default SocialMediaBar;
