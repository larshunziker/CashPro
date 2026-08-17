import React, { ReactElement } from 'react';
import classNames from 'classnames';
import socialMediaBarFactory from '../../../../../../../common/components/SocialMediaBar/factory';
import Link from '../../../../../../../common/components/Link';
import IconFacebookAlt from '../../../../../../../common/components/SVGIcon/components/SocialFacebookAlt';
import IconGoogleNews from '../../../../../../../common/components/SVGIcon/components/SocialGoogleNews';
import IconInstagram from '../../../../../../../common/components/SVGIcon/components/SocialInstagram';
import IconLinkedin from '../../../../../../../common/components/SVGIcon/components/SocialLinkedin';
import IconTwitter from '../../../../../../../common/components/SVGIcon/components/SocialTwitter';
import IconXing from '../../../../../../../common/components/SVGIcon/components/SocialXing';
import {
  SOCIAL_MEDIA_LINK_FACEBOOK,
  SOCIAL_MEDIA_LINK_GOOGLE_NEWS,
  SOCIAL_MEDIA_LINK_INSTAGRAM,
  SOCIAL_MEDIA_LINK_LINKEDIN,
  SOCIAL_MEDIA_LINK_TWITTER,
  SOCIAL_MEDIA_LINK_XING,
} from '../../../../constants';
import { SOCIAL_MEDIA_BAR_ORIGIN_NAVIGATION } from '../../constants';
import styles from './styles.legacy.css';
import {
  SocialMediaBarFactoryOptionsStyles,
  SocialMediaBarIconProps,
  SocialMediaBarProps,
} from '../../../../../../../common/components/SocialMediaBar/typings';

const socialMediaItems: Array<SocialMediaBarIconProps> = [
  {
    type: 'Facebook',
    component: <IconFacebookAlt />,
    link: SOCIAL_MEDIA_LINK_FACEBOOK,
  },
  {
    type: 'Twitter',
    component: <IconTwitter />,
    link: SOCIAL_MEDIA_LINK_TWITTER,
  },
  {
    type: 'Xing',
    component: <IconXing />,
    link: SOCIAL_MEDIA_LINK_XING,
  },
  {
    type: 'Linkedin',
    component: <IconLinkedin />,
    link: SOCIAL_MEDIA_LINK_LINKEDIN,
  },
  {
    type: 'Instagram',
    component: <IconInstagram />,
    link: SOCIAL_MEDIA_LINK_INSTAGRAM,
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
}: SocialMediaBarIconProps): ReactElement => (
  <Link
    path={link}
    className={styles.Link}
    target="_blank"
    onClick={(event) => event.stopPropagation()}
    ariaLabel={type}
  >
    <div className={classNames(styles.Content, styles.Icon)}>{component}</div>
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
