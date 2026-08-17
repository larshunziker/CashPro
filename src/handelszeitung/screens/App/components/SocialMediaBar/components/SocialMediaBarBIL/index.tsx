import React, { ReactElement } from 'react';
import classNames from 'classnames';
import socialMediaBarFactory from '../../../../../../../common/components/SocialMediaBar/factory';
import Link from '../../../../../../../common/components/Link';
import Icon from '../../../Icon';
import { PUBLICATION_BIL } from '../../../../../../../shared/constants/publications';
import { SOCIAL_MEDIA_BAR_ORIGIN_NAVIGATION } from '../../constants';
import {
  SOCIAL_MEDIA_LINK_FACEBOOK,
  SOCIAL_MEDIA_LINK_GOOGLE_NEWS,
  SOCIAL_MEDIA_LINK_INSTAGRAM,
  SOCIAL_MEDIA_LINK_LINKEDIN,
  SOCIAL_MEDIA_LINK_TWITTER,
  SOCIAL_MEDIA_LINK_XING,
} from './constants';
import styles from './styles.legacy.css';
import {
  SocialMediaBarFactoryOptionsStyles,
  SocialMediaBarIconProps,
  SocialMediaBarProps,
} from '../../../../../../../common/components/SocialMediaBar/typings';

const socialMediaItems: Array<SocialMediaBarIconProps> = [
  {
    type: 'Facebook',
    link: SOCIAL_MEDIA_LINK_FACEBOOK,
  },
  {
    type: 'Twitter',
    link: SOCIAL_MEDIA_LINK_TWITTER,
  },
  {
    type: 'Xing',
    link: SOCIAL_MEDIA_LINK_XING,
  },
  {
    type: 'Linkedin',
    link: SOCIAL_MEDIA_LINK_LINKEDIN,
  },
  {
    type: 'Instagram',
    link: SOCIAL_MEDIA_LINK_INSTAGRAM,
  },
  {
    type: 'GoogleNews',
    link: SOCIAL_MEDIA_LINK_GOOGLE_NEWS,
  },
];

const SocialMediaBarIcon = ({
  type,
  link,
}: SocialMediaBarIconProps): ReactElement => (
  <Link
    path={link}
    className={styles.Link}
    target="_blank"
    onClick={(event) => event.stopPropagation()}
    ariaLabel={type}
  >
    <div className={styles.Content}>
      <Icon
        type={type === 'Facebook' ? `Icon${type}F` : `Icon${type}`}
        addClass={styles.Icon}
        aria-hidden={true}
      />
    </div>
  </Link>
);

const getStylesByProps = ({
  origin = '',
}: SocialMediaBarProps): SocialMediaBarFactoryOptionsStyles => ({
  Wrapper: classNames(styles.Wrapper, {
    [styles.NavigationWrapper]: origin === SOCIAL_MEDIA_BAR_ORIGIN_NAVIGATION,
    [styles.SocialBarWrapper]: origin === PUBLICATION_BIL,
  }),
});

const SocialMediaBar = socialMediaBarFactory({
  socialMediaItems,
  SocialMediaBarIcon,
  styles: getStylesByProps,
});

export default SocialMediaBar;
