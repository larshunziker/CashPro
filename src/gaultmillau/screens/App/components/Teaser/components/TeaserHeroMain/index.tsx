import React from 'react';
import classNames from 'classnames';
import teaserFactory from '../../../../../../../common/components/Teaser/factory';
import {
  getIconAndBorderByProps,
  getShortTitleElementByProps,
} from '../../shared/helpers';
import {
  STYLE_3X2_1000,
  STYLE_3X2_440,
  STYLE_HEADER_16_9_LARGE,
} from '../../../../../../../shared/constants/images';
import {
  TEASER_HERO_MAIN_IDENTIFIER,
  TEASER_LEAD_LENGTH,
} from '../../constants';
import styles from './styles.legacy.css';
import { TeaserProps } from '../../shared/typings';

export const getInnerContentByProps = ({ description }: TeaserProps) => {
  if (!description) {
    return null;
  }
  return (
    <div
      className={styles.Lead}
      dangerouslySetInnerHTML={{
        __html: description,
      }}
    />
  );
};

const TeaserHero = teaserFactory({
  teaserImageStyles: {
    style_320: STYLE_3X2_440,
    style_760: STYLE_3X2_1000,
    style_960: STYLE_HEADER_16_9_LARGE,
  },
  leadOptions: {
    truncateCount: TEASER_LEAD_LENGTH,
    suffixText: '',
  },
  isIconPositionOnImage: true,
  icon: getIconAndBorderByProps(styles.PlayIcon),
  shortTitleElement: getShortTitleElementByProps(
    styles,
    styles.ShortTitle,
    TEASER_HERO_MAIN_IDENTIFIER,
  ),
  /* @ts-ignore TODO: TS2322 ->  Type '({ description } */
  innerContent: getInnerContentByProps,
  styles: {
    Wrapper: classNames(TEASER_HERO_MAIN_IDENTIFIER, styles.Wrapper),
    ContentWrapper: styles.Caption,
    ImageWrapper: styles.Img,
    Title: styles.Title,
    Lead: styles.Lead,
  },
});

export default TeaserHero;
