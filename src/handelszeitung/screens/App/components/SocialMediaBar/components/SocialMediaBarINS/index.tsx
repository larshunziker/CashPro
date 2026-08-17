import React, { ReactElement } from 'react';
import classNames from 'classnames';
import socialMediaBarFactory from '../../../../../../../common/components/SocialMediaBar/factory';
import Link from '../../../../../../../common/components/Link';
import Icon from '../../../Icon';
import { SOCIAL_MEDIA_BAR_ORIGIN_NAVIGATION } from '../../constants';
import { socialMediaItems } from './constants';
import styles from './styles.legacy.css';
import {
  SocialMediaBarFactoryOptionsStyles,
  SocialMediaBarIconProps,
  SocialMediaBarProps,
} from '../../../../../../../common/components/SocialMediaBar/typings';

const SocialMediaBarIcon = ({
  type,
  link,
}: SocialMediaBarIconProps): ReactElement => {
  return (
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
};

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
