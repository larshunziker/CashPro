import React from 'react';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../common/components/Teaser/factory';
import Icon from '../../../Icon';
import { STYLE_16X9_220 } from '../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';
import { TeaserVideoProps } from './typings';

const getStylesByProps = ({ isActive }: TeaserVideoProps) => {
  return {
    Wrapper: styles.Wrapper,
    ImageWrapper: styles.ImageWrapper,
    Image: styles.Image,
    ShortTitle: classNames(styles.ShortTitle, {
      [styles.IsActive]: isActive,
    }),
    Title: classNames(styles.Title, { [styles.IsActive]: isActive }),
  };
};

const getIconByProps = ({ isActive }: TeaserVideoProps) => (
  <Icon
    type="IconMovieButton"
    addClass={classNames(styles.Button, { [styles.ActiveButton]: isActive })}
  />
);

const TeaserVideo = teaserFactory({
  icon: getIconByProps,
  teaserImageStyles: { style_320: STYLE_16X9_220 },
  isIconPositionOnImage: true,
  styles: getStylesByProps,
});

export default TeaserVideo;
