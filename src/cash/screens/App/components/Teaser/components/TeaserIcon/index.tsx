import React from 'react';
import Icon from '../../../Icon';
import {
  TEASER_ICON_TYPE_GALLERY,
  TEASER_ICON_TYPE_GALLERY_ICON,
  TEASER_ICON_TYPE_VIDEO,
  TEASER_ICON_TYPE_VIDEO_ICON,
} from './constants';
import styles from './styles.legacy.css';
import { TeaserIconProps } from './typings';

const TeaserIcon = ({ type }: TeaserIconProps) => {
  if (!type) {
    return null;
  }

  switch (type) {
    case TEASER_ICON_TYPE_VIDEO: {
      return (
        <Icon
          type={TEASER_ICON_TYPE_VIDEO_ICON}
          addClass={styles.VideoTeaserIcon}
        />
      );
    }
    case TEASER_ICON_TYPE_GALLERY: {
      return (
        <Icon
          type={TEASER_ICON_TYPE_GALLERY_ICON}
          addClass={styles.GalleryTeaserIcon}
        />
      );
    }
    default:
      return null;
  }
};

export default TeaserIcon;
